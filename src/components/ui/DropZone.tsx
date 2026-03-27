import { useCallback, useRef, useState } from "react";
import { FileImage, Upload, X } from "lucide-react";
import { formatBytes, validateFile } from "../../lib/imageUtils";

export interface DropZoneProps {
  accept?: string[];
  multiple?: boolean;
  maxFiles?: number;
  maxFileSizeMB?: number;
  onFiles: (files: File[]) => void;
  label?: string;
  sublabel?: string;
}

export default function DropZone({
  accept = [],
  multiple = false,
  maxFiles = 10,
  maxFileSizeMB = 10,
  onFiles,
  label = "Drop files here or click to browse",
  sublabel,
}: DropZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [queue, setQueue] = useState<File[]>([]);
  const [errors, setErrors] = useState<string[]>([]);

  const processFiles = useCallback(
    (incoming: FileList | File[]) => {
      const newErrors: string[] = [];
      const validFiles: File[] = [];
      const fileArray = Array.from(incoming);

      const totalCount = queue.length + fileArray.length;
      if (totalCount > maxFiles) {
        newErrors.push(`Maximum ${maxFiles} files allowed.`);
      }

      const toProcess = fileArray.slice(0, maxFiles - queue.length);

      for (const file of toProcess) {
        const result = validateFile(file, accept, maxFileSizeMB);
        if (result.valid) {
          validFiles.push(file);
        } else {
          newErrors.push(`${file.name}: ${result.error}`);
        }
      }

      if (validFiles.length > 0) {
        setQueue((prev) => {
          const updated = [...prev, ...validFiles];
          onFiles(updated);
          return updated;
        });
      }

      setErrors(newErrors);
      if (newErrors.length > 0) {
        setTimeout(() => setErrors([]), 4000);
      }
    },
    [accept, maxFileSizeMB, maxFiles, onFiles, queue.length]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      if (e.dataTransfer.files.length > 0) {
        processFiles(e.dataTransfer.files);
      }
    },
    [processFiles]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        inputRef.current?.click();
      }
    },
    []
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        processFiles(e.target.files);
        e.target.value = "";
      }
    },
    [processFiles]
  );

  const removeFile = useCallback(
    (index: number) => {
      setQueue((prev) => {
        const updated = prev.filter((_, i) => i !== index);
        onFiles(updated);
        return updated;
      });
    },
    [onFiles]
  );

  const acceptAttr = accept.length > 0 ? accept.join(",") : undefined;

  return (
    <div className="flex flex-col gap-3">
      <div
        role="button"
        tabIndex={0}
        aria-label={label}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-6 py-10 text-center transition-all duration-[var(--transition-base)] ${
          isDragOver
            ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5"
            : "border-[var(--color-border)] bg-[var(--color-surface-2)] hover:border-[var(--color-primary)]/50 hover:bg-[var(--color-surface)]"
        }`}
      >
        <Upload
          className="h-8 w-8 text-[var(--color-text-muted)]"
          strokeWidth={1.5}
        />
        <p className="font-display text-sm font-semibold text-[var(--color-text-main)]">
          {label}
        </p>
        {sublabel && (
          <p className="text-xs text-[var(--color-text-muted)]">{sublabel}</p>
        )}
        {accept.length > 0 && (
          <p className="mt-1 text-xs text-[var(--color-text-muted)]">
            Accepted: {accept.join(", ")}
          </p>
        )}
        <input
          ref={inputRef}
          type="file"
          accept={acceptAttr}
          multiple={multiple}
          onChange={handleInputChange}
          className="hidden"
          tabIndex={-1}
        />
      </div>

      {errors.length > 0 && (
        <div className="flex flex-col gap-1">
          {errors.map((err, i) => (
            <p
              key={i}
              className="rounded-md bg-[var(--color-danger)]/10 px-3 py-1.5 text-xs font-medium text-[var(--color-danger)]"
            >
              {err}
            </p>
          ))}
        </div>
      )}

      {queue.length > 0 && (
        <ul className="flex flex-col gap-2">
          {queue.map((file, index) => (
            <li
              key={`${file.name}-${file.size}-${index}`}
              className="flex items-center gap-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2"
            >
              <FileImage
                className="h-5 w-5 shrink-0 text-[var(--color-primary)]"
                strokeWidth={1.5}
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-[var(--color-text-main)]">
                  {file.name}
                </p>
                <p className="text-xs text-[var(--color-text-muted)]">
                  {formatBytes(file.size)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => removeFile(index)}
                aria-label={`Remove ${file.name}`}
                className="shrink-0 rounded-md p-1 text-[var(--color-text-muted)] transition-colors duration-[var(--transition-base)] hover:bg-[var(--color-danger)]/10 hover:text-[var(--color-danger)]"
              >
                <X className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
