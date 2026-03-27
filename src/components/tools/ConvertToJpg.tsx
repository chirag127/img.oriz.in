import { useState, useCallback } from "react";
import { Upload, ArrowRightLeft } from "lucide-react";

export default function ConvertToJpg() {
  const [files, setFiles] = useState<File[]>([]);
  const [quality, setQuality] = useState(90);
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

  return (
    <div className="space-y-6">
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="border-2 border-dashed border-[var(--color-border)] rounded-xl p-12 text-center hover:border-[var(--color-primary)] transition-colors cursor-pointer relative"
      >
        <ArrowRightLeft className="w-10 h-10 mx-auto mb-4 text-[var(--color-text-muted)]" />
        <p className="text-lg font-semibold mb-1">
          Drop images here or click to upload
        </p>
        <p className="text-sm text-[var(--color-text-muted)]">
          Supports PNG, GIF, TIF, SVG, WEBP, HEIC
        </p>
        <input
          type="file"
          accept=".png,.gif,.tif,.tiff,.svg,.webp,.heic,.heif"
          multiple
          onChange={handleFileInput}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
      </div>

      {files.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <label className="text-sm font-semibold">Quality: {quality}%</label>
            <input
              type="range"
              min="10"
              max="100"
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
              className="flex-1"
            />
          </div>
          <p className="text-sm text-[var(--color-text-muted)]">
            {files.length} file{files.length !== 1 ? "s" : ""} will be
            converted to JPG
          </p>
          <button type="button" disabled={processing} className="btn-primary">
            {processing ? "Converting..." : "Convert to JPG"}
          </button>
        </div>
      )}
    </div>
  );
}
