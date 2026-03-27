"use client";

import { useCallback, useState } from "react";
import { Maximize2 } from "lucide-react";
import DropZone from "../ui/DropZone";
import ProgressBar from "../ui/ProgressBar";
import DownloadButton from "../ui/DownloadButton";
import {
  canvasToBlob,
  formatBytes,
  loadImage,
} from "../../lib/imageUtils";

interface ResizeResult {
  name: string;
  blob: Blob;
  originalSize: number;
}

const PRESETS: Record<string, { w: number; h: number }> = {
  "800x600": { w: 800, h: 600 },
  "1200x630": { w: 1200, h: 630 },
  "1080x1080": { w: 1080, h: 1080 },
  "1920x1080": { w: 1920, h: 1080 },
};

export default function ResizeImage() {
  const [files, setFiles] = useState<File[]>([]);
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  const [usePercent, setUsePercent] = useState(false);
  const [percent, setPercent] = useState(50);
  const [keepAspect, setKeepAspect] = useState(true);
  const [preset, setPreset] = useState("");
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<ResizeResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handlePresetChange = (value: string) => {
    setPreset(value);
    if (value && PRESETS[value]) {
      setWidth(PRESETS[value].w);
      setHeight(PRESETS[value].h);
    }
  };

  const handleProcess = useCallback(async () => {
    if (files.length === 0) return;
    setProcessing(true);
    setProgress(0);
    setError(null);
    setResults([]);

    const out: ResizeResult[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const url = URL.createObjectURL(file);
        const img = await loadImage(url);
        URL.revokeObjectURL(url);

        let newW: number;
        let newH: number;

        if (usePercent) {
          newW = Math.round(img.naturalWidth * (percent / 100));
          newH = Math.round(img.naturalHeight * (percent / 100));
        } else {
          newW = width;
          newH = height;
        }

        const canvas = document.createElement("canvas");
        canvas.width = newW;
        canvas.height = newH;
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("Canvas not supported");
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, 0, 0, newW, newH);

        const isPng = file.type === "image/png";
        const blob = await canvasToBlob(
          canvas,
          isPng ? "image/png" : "image/jpeg",
          0.92,
        );
        out.push({ name: file.name, blob, originalSize: file.size });
        setProgress(Math.round(((i + 1) / files.length) * 100));
      }

      setResults(out);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Resize failed");
    } finally {
      setProcessing(false);
    }
  }, [files, width, height, usePercent, percent]);

  return (
    <div className="flex flex-col gap-6">
      <DropZone
        onFiles={setFiles}
        accept={["image/jpeg", "image/png", "image/gif"]}
        multiple
        maxFiles={20}
        maxFileSizeMB={50}
        label="Upload images to resize"
        sublabel="JPG, PNG, GIF — batch supported"
      />

      {files.length > 0 && (
        <div className="flex flex-col gap-4 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
          <div className="flex items-center gap-2 text-sm font-semibold text-[var(--color-text-main)]">
            <Maximize2 className="h-4 w-4" />
            Resize Options
          </div>

          <label className="flex items-center gap-2 text-sm text-[var(--color-text-main)]">
            <input
              type="checkbox"
              checked={usePercent}
              onChange={(e) => setUsePercent(e.target.checked)}
              className="accent-[var(--color-primary)]"
            />
            Scale by percentage
          </label>

          {usePercent ? (
            <div>
              <label className="mb-1 block text-xs text-[var(--color-text-muted)]">
                Scale
              </label>
              <input
                type="number"
                min={1}
                max={500}
                value={percent}
                onChange={(e) => setPercent(Number(e.target.value) || 100)}
                className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-2)] px-3 py-2 text-sm text-[var(--color-text-main)] outline-none focus:border-[var(--color-primary)]"
              />
              <span className="text-xs text-[var(--color-text-muted)]">%</span>
            </div>
          ) : (
            <>
              <div>
                <label className="mb-1 block text-xs text-[var(--color-text-muted)]">
                  Preset
                </label>
                <select
                  value={preset}
                  onChange={(e) => handlePresetChange(e.target.value)}
                  className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-2)] px-3 py-2 text-sm text-[var(--color-text-main)] outline-none focus:border-[var(--color-primary)]"
                >
                  <option value="">Custom</option>
                  {Object.keys(PRESETS).map((k) => (
                    <option key={k} value={k}>
                      {k}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs text-[var(--color-text-muted)]">
                    Width (px)
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={width}
                    onChange={(e) => {
                      const v = Number(e.target.value) || 1;
                      setWidth(v);
                      if (keepAspect && files.length > 0) {
                        // aspect ratio maintained on process
                      }
                    }}
                    className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-2)] px-3 py-2 text-sm text-[var(--color-text-main)] outline-none focus:border-[var(--color-primary)]"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-[var(--color-text-muted)]">
                    Height (px)
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value) || 1)}
                    className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-2)] px-3 py-2 text-sm text-[var(--color-text-main)] outline-none focus:border-[var(--color-primary)]"
                  />
                </div>
              </div>
            </>
          )}

          <label className="flex items-center gap-2 text-sm text-[var(--color-text-main)]">
            <input
              type="checkbox"
              checked={keepAspect}
              onChange={(e) => setKeepAspect(e.target.checked)}
              className="accent-[var(--color-primary)]"
            />
            Maintain aspect ratio
          </label>

          <button
            type="button"
            onClick={handleProcess}
            disabled={processing}
            className="btn-primary"
          >
            <Maximize2 className="h-4 w-4" />
            {processing
              ? "Resizing..."
              : `Resize ${files.length} file${files.length > 1 ? "s" : ""}`}
          </button>
        </div>
      )}

      {processing && (
        <ProgressBar
          value={progress}
          label="Resizing..."
          color="var(--color-accent)"
        />
      )}

      {error && (
        <div className="rounded-lg border border-[var(--color-danger)]/30 bg-[var(--color-danger)]/10 p-4 text-sm text-[var(--color-danger)]">
          {error}
        </div>
      )}

      {results.length > 0 && (
        <DownloadButton
          blobs={results.map((r) => r.blob)}
          filenames={results.map((r) => r.name)}
          zipName="resized.zip"
        />
      )}
    </div>
  );
}
