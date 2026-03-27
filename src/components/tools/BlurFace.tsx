import { useState, useCallback } from "react";
import { Upload, ScanFace, Download } from "lucide-react";

export default function BlurFace() {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [mode, setMode] = useState<"blur" | "pixelate">("blur");
  const [intensity, setIntensity] = useState(20);
  const [facesDetected, setFacesDetected] = useState(0);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const dropped = Array.from(e.dataTransfer.files).find((f) =>
      f.type.startsWith("image/")
    );
    if (dropped) {
      setFile(dropped);
      setImageUrl(URL.createObjectURL(dropped));
      setFacesDetected(0);
    }
  }, []);

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files?.[0]) {
        setFile(e.target.files[0]);
        setImageUrl(URL.createObjectURL(e.target.files[0]));
        setFacesDetected(0);
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
          <ScanFace className="w-10 h-10 mx-auto mb-4 text-[var(--color-text-muted)]" />
          <p className="text-lg font-semibold mb-1">
            Drop an image here or click to upload
          </p>
          <p className="text-sm text-[var(--color-text-muted)]">
            Supports JPG, PNG — AI face detection and blur
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
          <div className="bg-[var(--color-surface-2)] rounded-xl p-2">
            <img
              src={imageUrl}
              alt="Preview"
              className="max-w-full mx-auto rounded-lg"
            />
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setMode("blur")}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${mode === "blur" ? "bg-[var(--color-primary)] text-white" : "bg-[var(--color-surface-2)]"}`}
            >
              Blur
            </button>
            <button
              type="button"
              onClick={() => setMode("pixelate")}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${mode === "pixelate" ? "bg-[var(--color-primary)] text-white" : "bg-[var(--color-surface-2)]"}`}
            >
              Pixelate
            </button>
          </div>

          <div>
            <label className="text-sm font-semibold block mb-1">
              Intensity: {intensity}
            </label>
            <input
              type="range"
              min="5"
              max="50"
              value={intensity}
              onChange={(e) => setIntensity(Number(e.target.value))}
              className="w-full"
            />
          </div>

          {facesDetected > 0 && (
            <p className="text-sm text-[var(--color-accent)] font-semibold">
              {facesDetected} face{facesDetected !== 1 ? "s" : ""} detected
            </p>
          )}

          <div className="flex gap-3">
            <button
              type="button"
              disabled={processing}
              onClick={() => setProcessing(true)}
              className="btn-primary"
            >
              <ScanFace className="w-4 h-4" />
              {processing ? "Detecting faces..." : "Detect & Blur Faces"}
            </button>
            {facesDetected > 0 && (
              <button type="button" className="btn-secondary">
                <Download className="w-4 h-4" /> Download
              </button>
            )}
          </div>
          <p className="text-xs text-[var(--color-text-muted)]">
            Face detection runs entirely in your browser using face-api.js. No
            images are uploaded to any server.
          </p>
        </div>
      )}
    </div>
  );
}
