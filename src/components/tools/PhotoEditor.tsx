import { useState, useRef, useCallback } from "react";
import { Upload, Type, Palette, Undo2, Redo2, Download } from "lucide-react";

export default function PhotoEditor() {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [blur, setBlur] = useState(0);
  const [sepia, setSepia] = useState(0);
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

  const resetFilters = () => {
    setBrightness(100);
    setContrast(100);
    setSaturation(100);
    setBlur(0);
    setSepia(0);
  };

  const filterStyle = {
    filter: `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) blur(${blur}px) sepia(${sepia}%)`,
  };

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
        <div className="space-y-6">
          <div className="relative bg-[var(--color-surface-2)] rounded-xl overflow-hidden">
            <img
              src={imageUrl}
              alt="Edit preview"
              className="max-w-full mx-auto block"
              style={filterStyle}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold block mb-1">
                Brightness: {brightness}%
              </label>
              <input
                type="range"
                min="0"
                max="200"
                value={brightness}
                onChange={(e) => setBrightness(Number(e.target.value))}
                className="w-full"
              />
            </div>
            <div>
              <label className="text-sm font-semibold block mb-1">
                Contrast: {contrast}%
              </label>
              <input
                type="range"
                min="0"
                max="200"
                value={contrast}
                onChange={(e) => setContrast(Number(e.target.value))}
                className="w-full"
              />
            </div>
            <div>
              <label className="text-sm font-semibold block mb-1">
                Saturation: {saturation}%
              </label>
              <input
                type="range"
                min="0"
                max="200"
                value={saturation}
                onChange={(e) => setSaturation(Number(e.target.value))}
                className="w-full"
              />
            </div>
            <div>
              <label className="text-sm font-semibold block mb-1">
                Blur: {blur}px
              </label>
              <input
                type="range"
                min="0"
                max="20"
                value={blur}
                onChange={(e) => setBlur(Number(e.target.value))}
                className="w-full"
              />
            </div>
            <div>
              <label className="text-sm font-semibold block mb-1">
                Sepia: {sepia}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={sepia}
                onChange={(e) => setSepia(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>

          <div className="flex gap-3 flex-wrap">
            <button type="button" className="btn-primary">
              <Download className="w-4 h-4" /> Download
            </button>
            <button type="button" onClick={resetFilters} className="btn-secondary">
              <Undo2 className="w-4 h-4" /> Reset
            </button>
          </div>
        </div>
      )}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
