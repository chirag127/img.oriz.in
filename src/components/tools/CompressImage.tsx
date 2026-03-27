"use client";

import { useCallback, useState } from "react";
import imageCompression from "browser-image-compression";
import { optimize } from "svgo";
import { Settings, Image as ImageIcon } from "lucide-react";
import DropZone from "../ui/DropZone";
import Slider from "../ui/Slider";
import ProgressBar from "../ui/ProgressBar";
import DownloadButton from "../ui/DownloadButton";
import { formatBytes } from "../../lib/imageUtils";

interface ProcessedFile {
  name: string;
  blob: Blob;
  originalSize: number;
}

export default function CompressImage() {
  const [files, setFiles] = useState<File[]>([]);
  const [quality, setQuality] = useState(80);
  const [lossless, setLossless] = useState(false);
  const [maxWidth, setMaxWidth] = useState(0);
  const [maxHeight, setMaxHeight] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<ProcessedFile[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleProcess = useCallback(async () => {
    if (files.length === 0) return;
    setProcessing(true);
    setProgress(0);
    setError(null);
    setResults([]);

    const processed: ProcessedFile[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const ext = file.name.split(".").pop()?.toLowerCase() ?? "";

        if (ext === "svg" || file.type === "image/svg+xml") {
          const text = await file.text();
          const result = optimize(text, {
            multipass: true,
            plugins: [
              {
                name: "preset-default",
                params: { overrides: { removeViewBox: false } },
              },
            ],
          });
          const blob = new Blob([result.data], { type: "image/svg+xml" });
          processed.push({ name: file.name, blob, originalSize: file.size });
        } else {
          const opts: Record<string, unknown> = {
            maxSizeMB: 50,
            useWebWorker: true,
            fileType: file.type || "image/jpeg",
          };
          if (lossless && (ext === "png" || file.type === "image/png")) {
            opts.fileType = "image/png";
            opts.initialQuality = quality / 100;
          } else {
            opts.initialQuality = quality / 100;
          }
          if (maxWidth > 0) opts.maxWidthOrHeight = maxWidth;
          if (maxHeight > 0) {
            opts.maxWidthOrHeight = Math.max(maxWidth || 0, maxHeight);
          }
          const compressed = await imageCompression(
            file,
            opts as imageCompression.Options,
          );
          processed.push({
            name: file.name,
            blob: compressed,
            originalSize: file.size,
          });
        }

        setProgress(Math.round(((i + 1) / files.length) * 100));
      }

      setResults(processed);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Compression failed");
    } finally {
      setProcessing(false);
    }
  }, [files, quality, lossless, maxWidth, maxHeight]);

  return (
    <div className="flex flex-col gap-6">
      <DropZone
        onFiles={setFiles}
        accept={["image/jpeg", "image/png", "image/gif", "image/svg+xml"]}
        multiple
        maxFiles={20}
        maxFileSizeMB={50}
        label="Upload images to compress"
        sublabel="JPG, PNG, GIF, SVG — up to 20 files"
      />

      {files.length > 0 && (
        <div className="flex flex-col gap-4 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
          <div className="flex items-center gap-2 text-sm font-semibold text-[var(--color-text-main)]">
            <Settings className="h-4 w-4" />
            Options
          </div>

          <Slider
            label="Quality"
            value={quality}
            min={1}
            max={100}
            onChange={setQuality}
            unit="%"
          />

          <label className="flex items-center gap-2 text-sm text-[var(--color-text-main)]">
            <input
              type="checkbox"
              checked={lossless}
              onChange={(e) => setLossless(e.target.checked)}
              className="accent-[var(--color-primary)]"
            />
            Lossless PNG compression
          </label>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs text-[var(--color-text-muted)]">
                Max Width (px, 0 = auto)
              </label>
              <input
                type="number"
                min={0}
                value={maxWidth}
                onChange={(e) => setMaxWidth(Number(e.target.value) || 0)}
                className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-2)] px-3 py-2 text-sm text-[var(--color-text-main)] outline-none focus:border-[var(--color-primary)]"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-[var(--color-text-muted)]">
                Max Height (px, 0 = auto)
              </label>
              <input
                type="number"
                min={0}
                value={maxHeight}
                onChange={(e) => setMaxHeight(Number(e.target.value) || 0)}
                className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-2)] px-3 py-2 text-sm text-[var(--color-text-main)] outline-none focus:border-[var(--color-primary)]"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleProcess}
            disabled={processing}
            className="btn-primary"
          >
            <ImageIcon className="h-4 w-4" />
            {processing
              ? "Compressing..."
              : `Compress ${files.length} file${files.length > 1 ? "s" : ""}`}
          </button>
        </div>
      )}

      {processing && (
        <ProgressBar
          value={progress}
          label="Compressing files..."
          color="var(--color-accent)"
        />
      )}

      {error && (
        <div className="rounded-lg border border-[var(--color-danger)]/30 bg-[var(--color-danger)]/10 p-4 text-sm text-[var(--color-danger)]">
          {error}
        </div>
      )}

      {results.length > 0 && (
        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold text-[var(--color-text-main)]">
            Results
          </h3>
          <div className="flex flex-col gap-2">
            {results.map((r) => {
              const ratio = r.originalSize > 0
                ? ((1 - r.blob.size / r.originalSize) * 100).toFixed(1)
                : "0";
              return (
                <div
                  key={r.name}
                  className="flex items-center justify-between rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3"
                >
                  <span className="truncate text-sm text-[var(--color-text-main)]">
                    {r.name}
                  </span>
                  <span className="text-xs text-[var(--color-text-muted)]">
                    {formatBytes(r.originalSize)} → {formatBytes(r.blob.size)}{" "}
                    <span className="text-[var(--color-accent)]">
                      ({ratio}%)
                    </span>
                  </span>
                </div>
              );
            })}
          </div>
          <DownloadButton
            blobs={results.map((r) => ({ blob: r.blob, filename: r.name }))}
            zipName="compressed.zip"
          />
        </div>
      )}
    </div>
  );
}
