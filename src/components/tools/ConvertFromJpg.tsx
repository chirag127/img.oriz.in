import { useState, useCallback } from "react";
import { Upload, Image as ImageIcon } from "lucide-react";

export default function ConvertFromJpg() {
  const [files, setFiles] = useState<File[]>([]);
  const [outputFormat, setOutputFormat] = useState<"png" | "gif">("png");
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
        <Upload className="w-10 h-10 mx-auto mb-4 text-[var(--color-text-muted)]" />
        <p className="text-lg font-semibold mb-1">
          Drop JPG images here or click to upload
        </p>
        <p className="text-sm text-[var(--color-text-muted)]">
          Supports JPG and JPEG files
        </p>
        <input
          type="file"
          accept=".jpg,.jpeg"
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
              onClick={() => setOutputFormat("png")}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${outputFormat === "png" ? "bg-[var(--color-primary)] text-white" : "bg-[var(--color-surface-2)]"}`}
            >
              PNG
            </button>
            <button
              type="button"
              onClick={() => setOutputFormat("gif")}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${outputFormat === "gif" ? "bg-[var(--color-primary)] text-white" : "bg-[var(--color-surface-2)]"}`}
            >
              Animated GIF
            </button>
          </div>
          <p className="text-sm text-[var(--color-text-muted)]">
            {files.length} file{files.length !== 1 ? "s" : ""} will be
            converted to {outputFormat.toUpperCase()}
          </p>
          <button type="button" disabled={processing} className="btn-primary">
            {processing ? "Converting..." : `Convert to ${outputFormat.toUpperCase()}`}
          </button>
        </div>
      )}
    </div>
  );
}
