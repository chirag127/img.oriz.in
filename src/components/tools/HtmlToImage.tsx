import { useState, useRef, useCallback } from "react";
import { Code, Download, Monitor } from "lucide-react";

export default function HtmlToImage() {
  const [html, setHtml] = useState(`<div style="padding: 40px; background: linear-gradient(135deg, #0057FF, #00D4AA); color: white; font-family: sans-serif; border-radius: 16px;">
  <h1 style="margin: 0 0 8px;">Hello World</h1>
  <p style="margin: 0; opacity: 0.9;">Edit this HTML to create your image</p>
</div>`);
  const [viewport, setViewport] = useState(800);
  const [format, setFormat] = useState<"jpg" | "svg">("jpg");
  const [processing, setProcessing] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-semibold block mb-2">HTML / CSS Code</label>
          <textarea
            value={html}
            onChange={(e) => setHtml(e.target.value)}
            className="w-full h-64 px-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] font-mono text-sm resize-y"
            spellCheck={false}
          />
        </div>
        <div>
          <label className="text-sm font-semibold block mb-2">Preview</label>
          <div className="bg-[var(--color-surface-2)] rounded-xl overflow-hidden border border-[var(--color-border)]">
            <iframe
              ref={iframeRef}
              srcDoc={html}
              title="HTML preview"
              className="w-full h-64 border-0"
              sandbox="allow-same-origin"
              style={{ maxWidth: `${viewport}px`, margin: "0 auto", display: "block" }}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <Monitor className="w-4 h-4 text-[var(--color-text-muted)]" />
          <label className="text-sm font-semibold">Width:</label>
          <input
            type="number"
            value={viewport}
            onChange={(e) => setViewport(Number(e.target.value))}
            className="w-24 px-3 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-sm"
          />
          <span className="text-sm text-[var(--color-text-muted)]">px</span>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setFormat("jpg")}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${format === "jpg" ? "bg-[var(--color-primary)] text-white" : "bg-[var(--color-surface-2)]"}`}
          >
            JPG
          </button>
          <button
            type="button"
            onClick={() => setFormat("svg")}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${format === "svg" ? "bg-[var(--color-primary)] text-white" : "bg-[var(--color-surface-2)]"}`}
          >
            SVG
          </button>
        </div>
      </div>

      <button
        type="button"
        disabled={processing}
        onClick={() => setProcessing(true)}
        className="btn-primary"
      >
        <Download className="w-4 h-4" />
        {processing ? "Rendering..." : `Export as ${format.toUpperCase()}`}
      </button>
      <p className="text-xs text-[var(--color-text-muted)]">
        All rendering happens in your browser using html2canvas.
      </p>
    </div>
  );
}
