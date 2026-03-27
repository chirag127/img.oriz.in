import { useState, useCallback } from "react";
import { Upload, Eraser, Download } from "lucide-react";

export default function RemoveBackground() {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [bgColor, setBgColor] = useState<string>("transparent");

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const dropped = Array.from(e.dataTransfer.files).find((f) =>
      f.type.startsWith("image/")
    );
    if (dropped) {
      setFile(dropped);
      setImageUrl(URL.createObjectURL(dropped));
      setResult(null);
    }
  }, []);

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files?.[0]) {
        setFile(e.target.files[0]);
        setImageUrl(URL.createObjectURL(e.target.files[0]));
        setResult(null);
      }
    },
    []
  );

  return (
    <div className="space-y-6">
      {!imageUrl ? (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="border-2 border-dashed border-[var(--color-border)] rounded-xl p-12 text-center hover:border-[var(--color-primary)] transition-colors cursor-pointer relative"
        >
          <Eraser className="w-10 h-10 mx-auto mb-4 text-[var(--color-text-muted)]" />
          <p className="text-lg font-semibold mb-1">
            Drop an image here or click to upload
          </p>
          <p className="text-sm text-[var(--color-text-muted)]">
            Supports JPG, PNG — AI-powered background removal
          </p>
          <input
            type="file"
            accept=".jpg,.jpeg,.png"
            onChange={handleFileInput}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-semibold mb-2">Original</p>
              <div className="bg-[var(--color-surface-2)] rounded-xl p-2">
                <img
                  src={imageUrl}
                  alt="Original"
                  className="max-w-full mx-auto rounded-lg"
                />
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold mb-2">Result</p>
              <div className="checkerboard-bg rounded-xl p-2 min-h-[200px] flex items-center justify-center">
                {result ? (
                  <img
                    src={result}
                    alt="Background removed"
                    className="max-w-full rounded-lg"
                  />
                ) : (
                  <p className="text-sm text-[var(--color-text-muted)]">
                    Click "Remove Background" to process
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-2 flex-wrap">
            <span className="text-sm font-semibold self-center mr-2">
              Fill color:
            </span>
            {["transparent", "#ffffff", "#000000", "#0057FF"].map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setBgColor(c)}
                className={`w-8 h-8 rounded-lg border-2 ${bgColor === c ? "border-[var(--color-primary)]" : "border-[var(--color-border)]"}`}
                style={{
                  backgroundColor: c === "transparent" ? undefined : c,
                  backgroundImage:
                    c === "transparent"
                      ? "linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)"
                      : undefined,
                  backgroundSize: "8px 8px",
                  backgroundPosition: "0 0, 0 4px, 4px -4px, -4px 0",
                }}
                aria-label={`Background color: ${c}`}
              />
            ))}
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              disabled={processing}
              onClick={() => setProcessing(true)}
              className="btn-primary"
            >
              <Eraser className="w-4 h-4" />
              {processing ? "Processing..." : "Remove Background"}
            </button>
            {result && (
              <button type="button" className="btn-secondary">
                <Download className="w-4 h-4" /> Download PNG
              </button>
            )}
          </div>
          <p className="text-xs text-[var(--color-text-muted)]">
            All processing happens locally using ONNX models. Your image never
            leaves your device.
          </p>
        </div>
      )}
    </div>
  );
}
