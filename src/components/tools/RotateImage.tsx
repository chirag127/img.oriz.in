import { useState, useCallback } from "react";
import { Upload, RotateCw, RotateCcw, FlipHorizontal, FlipVertical } from "lucide-react";

export default function RotateImage() {
  const [files, setFiles] = useState<File[]>([]);
  const [rotation, setRotation] = useState(0);
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);
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

  const transformStyle = {
    transform: `rotate(${rotation}deg) scaleX(${flipH ? -1 : 1}) scaleY(${flipV ? -1 : 1})`,
  };

  return (
    <div className="space-y-6">
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="border-2 border-dashed border-[var(--color-border)] rounded-xl p-12 text-center hover:border-[var(--color-primary)] transition-colors cursor-pointer relative"
      >
        <RotateCw className="w-10 h-10 mx-auto mb-4 text-[var(--color-text-muted)]" />
        <p className="text-lg font-semibold mb-1">
          Drop images here or click to upload
        </p>
        <p className="text-sm text-[var(--color-text-muted)]">
          Supports JPG, PNG, GIF
        </p>
        <input
          type="file"
          accept=".jpg,.jpeg,.png,.gif"
          multiple
          onChange={handleFileInput}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
      </div>

      {files.length > 0 && (
        <div className="space-y-4">
          <div className="bg-[var(--color-surface-2)] rounded-xl p-4 overflow-hidden">
            <img
              src={URL.createObjectURL(files[0])}
              alt="Preview"
              className="max-w-full mx-auto rounded-lg transition-transform duration-300"
              style={transformStyle}
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => setRotation((r) => r - 90)}
              className="btn-secondary"
            >
              <RotateCcw className="w-4 h-4" /> Rotate Left
            </button>
            <button
              type="button"
              onClick={() => setRotation((r) => r + 90)}
              className="btn-secondary"
            >
              <RotateCw className="w-4 h-4" /> Rotate Right
            </button>
            <button
              type="button"
              onClick={() => setFlipH(!flipH)}
              className={`btn-secondary ${flipH ? "bg-[var(--color-primary)] text-white" : ""}`}
            >
              <FlipHorizontal className="w-4 h-4" /> Flip H
            </button>
            <button
              type="button"
              onClick={() => setFlipV(!flipV)}
              className={`btn-secondary ${flipV ? "bg-[var(--color-primary)] text-white" : ""}`}
            >
              <FlipVertical className="w-4 h-4" /> Flip V
            </button>
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
            {processing ? "Processing..." : "Apply & Download"}
          </button>
        </div>
      )}
    </div>
  );
}
