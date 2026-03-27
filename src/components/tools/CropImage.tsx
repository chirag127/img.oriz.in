import { useState, useRef, useCallback } from "react";
import { Upload, Crop as CropIcon } from "lucide-react";

export default function CropImage() {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [aspectRatio, setAspectRatio] = useState<string>("free");
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

  const ratios = [
    { label: "Free", value: "free" },
    { label: "1:1", value: "1:1" },
    { label: "16:9", value: "16:9" },
    { label: "4:3", value: "4:3" },
    { label: "3:2", value: "3:2" },
  ];

  return (
    <div className="space-y-6">
      {!imageUrl ? (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="border-2 border-dashed border-[var(--color-border)] rounded-xl p-12 text-center hover:border-[var(--color-primary)] transition-colors cursor-pointer relative"
        >
          <Upload className="w-10 h-10 mx-auto mb-4 text-[var(--color-text-muted)]" />
          <p className="text-lg font-semibold mb-1">
            Drop an image here or click to upload
          </p>
          <p className="text-sm text-[var(--color-text-muted)]">
            Supports JPG, PNG, GIF
          </p>
          <input
            type="file"
            accept=".jpg,.jpeg,.png,.gif"
            onChange={handleFileInput}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex gap-2 flex-wrap">
            {ratios.map((r) => (
              <button
                key={r.value}
                type="button"
                onClick={() => setAspectRatio(r.value)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${aspectRatio === r.value ? "bg-[var(--color-primary)] text-white" : "bg-[var(--color-surface-2)]"}`}
              >
                {r.label}
              </button>
            ))}
          </div>
          <div className="relative bg-[var(--color-surface-2)] rounded-xl overflow-hidden">
            <img
              src={imageUrl}
              alt="Crop preview"
              className="max-w-full mx-auto block"
            />
          </div>
          <div className="flex gap-3">
            <button type="button" className="btn-primary">
              <CropIcon className="w-4 h-4" /> Apply Crop
            </button>
            <button
              type="button"
              onClick={() => {
                setFile(null);
                setImageUrl(null);
              }}
              className="btn-secondary"
            >
              Reset
            </button>
          </div>
        </div>
      )}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
