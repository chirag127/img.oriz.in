import { useState, useCallback } from "react";
import { Upload, Droplets, Type, Image as ImageIcon } from "lucide-react";

export default function WatermarkImage() {
  const [files, setFiles] = useState<File[]>([]);
  const [mode, setMode] = useState<"text" | "image">("text");
  const [text, setText] = useState("© Your Name");
  const [opacity, setOpacity] = useState(50);
  const [fontSize, setFontSize] = useState(32);
  const [position, setPosition] = useState("bottom-right");
  const [processing, setProcessing] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const dropped = Array.from(e.dataTransfer.files).filter((f) =>
      f.type.startsWith("image/")
    );
    setFiles((prev) => [...prev, ...dropped]);
  }, []);

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        setFiles((prev) => [...prev, ...Array.from(e.target.files!)]);
      }
    },
    []
  );

  const positions = [
    "top-left",
    "top-right",
    "center",
    "bottom-left",
    "bottom-right",
  ];

  return (
    <div className="space-y-6">
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="border-2 border-dashed border-[var(--color-border)] rounded-xl p-12 text-center hover:border-[var(--color-primary)] transition-colors cursor-pointer relative"
      >
        <Droplets className="w-10 h-10 mx-auto mb-4 text-[var(--color-text-muted)]" />
        <p className="text-lg font-semibold mb-1">
          Drop images here or click to upload
        </p>
        <p className="text-sm text-[var(--color-text-muted)]">
          Supports JPG, PNG — batch processing available
        </p>
        <input
          type="file"
          accept=".jpg,.jpeg,.png"
          multiple
          onChange={handleFileInput}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
      </div>

      {files.length > 0 && (
        <div className="space-y-4">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setMode("text")}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${mode === "text" ? "bg-[var(--color-primary)] text-white" : "bg-[var(--color-surface-2)]"}`}
            >
              <Type className="w-4 h-4 inline mr-1" /> Text Watermark
            </button>
            <button
              type="button"
              onClick={() => setMode("image")}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${mode === "image" ? "bg-[var(--color-primary)] text-white" : "bg-[var(--color-surface-2)]"}`}
            >
              <ImageIcon className="w-4 h-4 inline mr-1" /> Image Watermark
            </button>
          </div>

          {mode === "text" ? (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold block mb-1">
                  Watermark Text
                </label>
                <input
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold block mb-1">
                    Opacity: {opacity}%
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={opacity}
                    onChange={(e) => setOpacity(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold block mb-1">
                    Font Size: {fontSize}px
                  </label>
                  <input
                    type="range"
                    min="12"
                    max="120"
                    value={fontSize}
                    onChange={(e) => setFontSize(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="border-2 border-dashed border-[var(--color-border)] rounded-xl p-8 text-center relative">
              <p className="text-sm text-[var(--color-text-muted)]">
                Upload your logo image
              </p>
              <input
                type="file"
                accept=".png,.jpg,.jpeg"
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
          )}

          <div>
            <label className="text-sm font-semibold block mb-2">Position</label>
            <div className="flex gap-2 flex-wrap">
              {positions.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPosition(p)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors capitalize ${position === p ? "bg-[var(--color-primary)] text-white" : "bg-[var(--color-surface-2)]"}`}
                >
                  {p.replace("-", " ")}
                </button>
              ))}
            </div>
          </div>

          <p className="text-sm text-[var(--color-text-muted)]">
            {files.length} file{files.length !== 1 ? "s" : ""} selected
          </p>
          <button
            type="button"
            disabled={processing}
            onClick={() => setProcessing(true)}
            className="btn-primary"
          >
            {processing ? "Adding watermark..." : "Add Watermark"}
          </button>
        </div>
      )}
    </div>
  );
}
