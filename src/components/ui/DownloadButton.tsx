import { useCallback, useState } from "react";
import { Download } from "lucide-react";
import JSZip from "jszip";
import { downloadBlob } from "../../lib/imageUtils";

export interface DownloadButtonProps {
  blobs: { blob: Blob; filename: string }[];
  label?: string;
  disabled?: boolean;
}

export default function DownloadButton({
  blobs,
  label,
  disabled = false,
}: DownloadButtonProps) {
  const [isZipping, setIsZipping] = useState(false);

  const handleDownload = useCallback(async () => {
    if (blobs.length === 0) return;

    if (blobs.length === 1) {
      downloadBlob(blobs[0].blob, blobs[0].filename);
      return;
    }

    setIsZipping(true);
    try {
      const zip = new JSZip();
      for (const { blob, filename } of blobs) {
        zip.file(filename, blob);
      }
      const zipBlob = await zip.generateAsync({ type: "blob" });
      downloadBlob(zipBlob, "download.zip");
    } finally {
      setIsZipping(false);
    }
  }, [blobs]);

  const isDisabled = disabled || blobs.length === 0 || isZipping;

  const buttonLabel =
    label ?? (blobs.length > 1 ? `Download ${blobs.length} Files` : "Download");

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={isDisabled}
      className="btn-primary inline-flex items-center gap-2 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <Download className="h-4 w-4" />
      {isZipping ? "Preparing ZIP..." : buttonLabel}
    </button>
  );
}
