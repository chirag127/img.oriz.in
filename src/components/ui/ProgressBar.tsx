export interface ProgressBarProps {
  value?: number;
  label?: string;
  sublabel?: string;
}

export default function ProgressBar({ value, label, sublabel }: ProgressBarProps) {
  const isDeterminate = value !== undefined;
  const clampedValue = isDeterminate ? Math.min(100, Math.max(0, value)) : 0;

  return (
    <div className="flex flex-col gap-1.5">
      {(label || (isDeterminate && sublabel)) && (
        <div className="flex items-center justify-between">
          {label && (
            <span className="text-sm font-medium text-[var(--color-text-main)]">
              {label}
            </span>
          )}
          {isDeterminate && (
            <span className="font-mono text-xs font-semibold text-[var(--color-text-muted)]">
              {Math.round(clampedValue)}%
            </span>
          )}
        </div>
      )}
      {sublabel && !isDeterminate && (
        <span className="text-xs text-[var(--color-text-muted)]">{sublabel}</span>
      )}
      <div className="relative h-3 w-full overflow-hidden rounded-full bg-[var(--color-surface-2)]">
        {isDeterminate ? (
          <div
            className="h-full rounded-full transition-all duration-300 ease-out"
            style={{
              width: `${clampedValue}%`,
              background:
                "linear-gradient(90deg, var(--color-primary), var(--color-accent))",
            }}
          />
        ) : (
          <div
            className="animate-progress-indeterminate absolute inset-y-0 w-1/3 rounded-full"
            style={{
              background:
                "linear-gradient(90deg, var(--color-primary), var(--color-accent))",
            }}
          />
        )}
      </div>
      <style>{`
        @keyframes progress-indeterminate {
          0% {
            left: -33%;
          }
          100% {
            left: 100%;
          }
        }
        .animate-progress-indeterminate {
          animation: progress-indeterminate 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
