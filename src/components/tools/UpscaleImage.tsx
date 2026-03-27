import { useState, useCallback } from "react";
import { Upload, Sparkles, ZoomIn } from "lucide-react";

export default function UpscaleImage() {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [scale, setScale] = useState<2 | 4>(2);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const dropped = Array.from(e.dataTransfer.files).find((f) =>
      f.type.startsWith("image/")
    );
    if (dropped) {
      setFile(dropped);
      setImageUrl(URL.createObjectURL(dropped));
    }
  }, []);

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files?.[0]) {
        setFile(e.target.files[0]);
        setImageUrl(URL.createObjectURL(e.target.files[0]));
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
          <Sparkles className="w-10 h-10 mx-auto mb-4 text-[var(--color-text-muted)]" />
          <p className="text-lg font-semibold mb-1">
            Drop an image here or click to upload
          </p>
          <p className="text-sm text-[var(--color-text-muted)]">
            Supports JPG, PNG — AI-powered upscaling with Real-ESRGAN
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
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setScale(2)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${scale === 2 ? "bg-[var(--color-primary)] text-white" : "bg-[var(--color-surface-2)]"}`}
            >
              <ZoomIn className="w-4 h-4 inline mr-1" /> 2x Upscale
            </button>
            <button
              type="button"
              onClick={() => setScale(4)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${scale === 4 ? "bg-[var(--color-primary)] text-white" : "bg-[var(--color-surface-2)]"}`}
            >
              <ZoomIn className="w-4 h-4 inline mr-1" /> 4x Upscale
            </button>
          </div>

          <div className="bg-[var(--color-surface-2)] rounded-xl p-4">
            <img
              src={imageUrl}
              alt="Original"
              className="max-w-full mx-auto rounded-lg"
            />
            <p className="text-sm text-[var(--color-text-muted)] mt-2 text-center">
              Original: {file?.name} ({((file?.size || 0) / 1024).toFixed(1)} KB)
            </p>
          </div>

          {processing && (
            <div className="w-full bg-[var(--color-surface-2)] rounded-full h-2">
              <div
                className="bg-[var(--color-primary)] h-2 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}

          <button
            type="button"
            disabled={processing}
            onClick={() => {
              setProcessing(true);
              setProgress(0);
            }}
            className="btn-primary"
          >
            <Sparkles className="w-4 h-4" />
            {processing ? "Upscaling..." : `Upscale ${scale}x`}
          </button>
          <p className="text-xs text-[var(--color-text-muted)]">
            All processing happens in your browser. Your image never leaves your
            device.
          </p>
        </div>
      )}
    </div>
  );
}
