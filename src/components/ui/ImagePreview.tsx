import { Download } from "lucide-react";
import { formatBytes } from "../../lib/imageUtils";

export interface ImagePreviewProps {
  beforeUrl?: string;
  afterUrl?: string;
  beforeSize?: number;
  afterSize?: number;
  onDownload?: () => void;
}

export default function ImagePreview({
  beforeUrl,
  afterUrl,
  beforeSize,
  afterSize,
  onDownload,
}: ImagePreviewProps) {
  const hasDelta =
    beforeSize !== undefined &&
    afterSize !== undefined &&
    beforeSize > 0;

  const deltaPercent = hasDelta
    ? Math.round(((beforeSize - afterSize) / beforeSize) * 100)
    : 0;

  const isSmaller = deltaPercent > 0;

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {beforeUrl && (
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
              Before
            </span>
            <div className="overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-2)]">
              <img
                src={beforeUrl}
                alt="Before"
                className="h-auto w-full object-contain"
                style={{ maxHeight: "400px" }}
              />
            </div>
            {beforeSize !== undefined && (
              <span className="font-mono text-xs text-[var(--color-text-muted)]">
                {formatBytes(beforeSize)}
              </span>
            )}
          </div>
        )}
        {afterUrl && (
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
              After
            </span>
            <div className="overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-2)]">
              <img
                src={afterUrl}
                alt="After"
                className="h-auto w-full object-contain"
                style={{ maxHeight: "400px" }}
              />
            </div>
            {afterSize !== undefined && (
              <span className="font-mono text-xs text-[var(--color-text-muted)]">
                {formatBytes(afterSize)}
              </span>
            )}
          </div>
        )}
      </div>

      {hasDelta && (
        <div className="flex items-center gap-3">
          <span
            className={`rounded-full px-2.5 py-1 font-mono text-xs font-bold ${
              isSmaller
                ? "bg-[var(--color-accent)]/15 text-[var(--color-accent)]"
                : "bg-[var(--color-danger)]/15 text-[var(--color-danger)]"
            }`}
          >
            {isSmaller ? "-" : "+"}
            {Math.abs(deltaPercent)}%
          </span>
          <span className="text-xs text-[var(--color-text-muted)]">
            {isSmaller ? "Smaller" : "Larger"} ({formatBytes(beforeSize)} {"->"}{" "}
            {formatBytes(afterSize)})
          </span>
        </div>
      )}

      {onDownload && afterUrl && (
        <button
          type="button"
          onClick={onDownload}
          className="btn-primary inline-flex w-fit items-center gap-2"
        >
          <Download className="h-4 w-4" />
          Download Result
        </button>
      )}
    </div>
  );
}
