import { useState, useCallback } from "react";
import { Upload, Laugh, Download } from "lucide-react";

const MEME_TEMPLATES = [
  { id: "drake", name: "Drake Hotline Bling", url: "/templates/drake.jpg" },
  { id: "distracted", name: "Distracted Boyfriend", url: "/templates/distracted.jpg" },
  { id: "twobuttons", name: "Two Buttons", url: "/templates/twobuttons.jpg" },
  { id: "changemymind", name: "Change My Mind", url: "/templates/changemymind.jpg" },
  { id: "expanding", name: "Expanding Brain", url: "/templates/expanding.jpg" },
];

export default function MemeGenerator() {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [fontSize, setFontSize] = useState(32);
  const [showTemplates, setShowTemplates] = useState(true);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const dropped = Array.from(e.dataTransfer.files).find((f) =>
      f.type.startsWith("image/")
    );
    if (dropped) {
      setFile(dropped);
      setImageUrl(URL.createObjectURL(dropped));
      setShowTemplates(false);
    }
  }, []);

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files?.[0]) {
        setFile(e.target.files[0]);
        setImageUrl(URL.createObjectURL(e.target.files[0]));
        setShowTemplates(false);
      }
    },
    []
  );

  const selectTemplate = (url: string) => {
    setImageUrl(url);
    setShowTemplates(false);
  };

  return (
    <div className="space-y-6">
      {showTemplates && !imageUrl ? (
        <div className="space-y-4">
          <p className="text-lg font-semibold">Choose a template or upload your own</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {MEME_TEMPLATES.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => selectTemplate(t.url)}
                className="tool-card items-center text-center p-3"
              >
                <Laugh className="w-8 h-8 mx-auto mb-2 text-[var(--color-primary)]" />
                <span className="text-xs font-semibold">{t.name}</span>
              </button>
            ))}
          </div>
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="border-2 border-dashed border-[var(--color-border)] rounded-xl p-8 text-center hover:border-[var(--color-primary)] transition-colors cursor-pointer relative"
          >
            <Upload className="w-8 h-8 mx-auto mb-2 text-[var(--color-text-muted)]" />
            <p className="font-semibold">Or upload your own image</p>
            <input
              type="file"
              accept=".jpg,.jpeg,.png,.gif"
              onChange={handleFileInput}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {imageUrl && (
            <div className="relative bg-[var(--color-surface-2)] rounded-xl overflow-hidden">
              <div className="relative">
                <img
                  src={imageUrl}
                  alt="Meme"
                  className="max-w-full mx-auto block"
                />
                <div
                  className="absolute inset-x-0 top-4 text-center pointer-events-none"
                  style={{
                    textShadow: "2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000",
                    fontFamily: "Impact, sans-serif",
                    fontSize: `${fontSize}px`,
                    color: "white",
                    textTransform: "uppercase",
                  }}
                >
                  {topText}
                </div>
                <div
                  className="absolute inset-x-0 bottom-4 text-center pointer-events-none"
                  style={{
                    textShadow: "2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000",
                    fontFamily: "Impact, sans-serif",
                    fontSize: `${fontSize}px`,
                    color: "white",
                    textTransform: "uppercase",
                  }}
                >
                  {bottomText}
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold block mb-1">Top Text</label>
              <input
                type="text"
                value={topText}
                onChange={(e) => setTopText(e.target.value)}
                placeholder="TOP TEXT"
                className="w-full px-3 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]"
              />
            </div>
            <div>
              <label className="text-sm font-semibold block mb-1">Bottom Text</label>
              <input
                type="text"
                value={bottomText}
                onChange={(e) => setBottomText(e.target.value)}
                placeholder="BOTTOM TEXT"
                className="w-full px-3 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold block mb-1">
              Font Size: {fontSize}px
            </label>
            <input
              type="range"
              min="16"
              max="72"
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="flex gap-3">
            <button type="button" className="btn-primary">
              <Download className="w-4 h-4" /> Download PNG
            </button>
            <button
              type="button"
              onClick={() => {
                setShowTemplates(true);
                setImageUrl(null);
                setFile(null);
              }}
              className="btn-secondary"
            >
              New Meme
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
