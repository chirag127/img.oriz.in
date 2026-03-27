import { useEffect, useRef } from "react";
import { X, type LucideIcon } from "lucide-react";
import { tools, categoryLabels, type ToolMeta } from "../../lib/toolMeta";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ToolItem {
  id: string;
  name: string;
  href: string;
  isNew?: boolean;
}

interface GroupedTools {
  [key: string]: ToolItem[];
}

function groupToolsByCategory(toolsArray: ToolMeta[]): GroupedTools {
  return toolsArray.reduce<GroupedTools>((acc, tool) => {
    const category = tool.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push({
      id: tool.id,
      name: tool.name,
      href: tool.href,
      isNew: tool.isNew,
    });
    return acc;
  }, {});
}

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const groupedTools = groupToolsByCategory(tools);
  const categoryOrder = ["image", "convert", "edit", "ai"] as const;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      closeButtonRef.current?.focus();
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  const handleLinkClick = () => {
    onClose();
  };

  const categoryLabelMap: Record<string, string> = {
    image: categoryLabels.image || "Image Tools",
    convert: categoryLabels.convert || "Convert",
    edit: categoryLabels.edit || "Edit & Create",
    ai: categoryLabels.ai || "AI Tools",
  };

  return (
    <>
      {isOpen && (
        <div
          ref={overlayRef}
          className="fixed inset-0 bg-black/50 z-50 transition-opacity duration-300"
          onClick={handleOverlayClick}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        />
      )}
      <nav
        className={`fixed top-0 right-0 h-full w-[300px] bg-[var(--color-surface)] z-50 transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="navigation"
        aria-label="Mobile navigation"
      >
        <div className="flex items-center justify-between p-4 border-b border-[var(--color-border)]">
          <span className="text-lg font-bold text-[var(--color-primary)]">Menu</span>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="p-2 text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] hover:bg-[var(--color-surface-2)] rounded-lg transition-colors"
            aria-label="Close navigation menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto h-[calc(100%-73px)]">
          {categoryOrder.map((category) => {
            const items = groupedTools[category];
            if (!items || items.length === 0) return null;

            return (
              <div key={category} className="mb-6">
                <h3 className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider mb-3">
                  {categoryLabelMap[category] || category}
                </h3>
                <ul className="space-y-1">
                  {items.map((tool) => (
                    <li key={tool.id}>
                      <a
                        href={tool.href}
                        onClick={handleLinkClick}
                        className="flex items-center justify-between px-3 py-2.5 text-sm text-[var(--color-text-main)] hover:bg-[var(--color-surface-2)] hover:text-[var(--color-primary)] rounded-lg transition-colors"
                      >
                        {tool.name}
                        {tool.isNew && (
                          <span className="badge-new text-[10px]">NEW</span>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </nav>
    </>
  );
}