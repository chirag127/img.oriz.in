import {
  Minimize2,
  Maximize2,
  Crop,
  ArrowRightLeft,
  ImageIcon,
  Paintbrush,
  Sparkles,
  Eraser,
  Droplets,
  Laugh,
  RotateCw,
  Code,
  ScanFace,
  type LucideIcon,
} from "lucide-react";

export interface ToolMeta {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  icon: LucideIcon;
  href: string;
  category: "image" | "convert" | "edit" | "ai";
  isNew?: boolean;
  accept: string[];
  keywords: string[];
}

export const tools: ToolMeta[] = [
  {
    id: "compress-image",
    name: "Compress Image",
    description: "Reduce file size without visible quality loss",
    longDescription:
      "Compress JPG, PNG, SVG, and GIF images directly in your browser. Adjust quality from 1-100, enable lossless compression for PNG, and process up to 20 files at once. Download individually or as a ZIP.",
    icon: Minimize2,
    href: "/tools/compress-image/",
    category: "image",
    accept: [".jpg", ".jpeg", ".png", ".svg", ".gif"],
    keywords: [
      "compress",
      "reduce size",
      "optimize",
      "jpg",
      "png",
      "svg",
      "gif",
    ],
  },
  {
    id: "resize-image",
    name: "Resize Image",
    description: "Change dimensions by pixels or percentage",
    longDescription:
      "Resize images by exact pixel dimensions or by percentage. Maintain aspect ratio with one click, use social media presets, and batch-process multiple images with the same settings.",
    icon: Maximize2,
    href: "/tools/resize-image/",
    category: "image",
    accept: [".jpg", ".jpeg", ".png", ".gif", ".svg"],
    keywords: [
      "resize",
      "dimensions",
      "pixels",
      "percentage",
      "social media",
    ],
  },
  {
    id: "crop-image",
    name: "Crop Image",
    description: "Visual drag-to-crop editor with ratio presets",
    longDescription:
      "Crop images with a visual drag-to-select editor. Choose from preset aspect ratios (1:1, 16:9, 4:3, 3:2) or crop freely. See pixel coordinates update in real-time as you adjust.",
    icon: Crop,
    href: "/tools/crop-image/",
    category: "image",
    isNew: false,
    accept: [".jpg", ".jpeg", ".png", ".gif"],
    keywords: ["crop", "cut", "aspect ratio", "trim"],
  },
  {
    id: "convert-to-jpg",
    name: "Convert to JPG",
    description: "PNG, GIF, SVG, WEBP, HEIC to JPG",
    longDescription:
      "Convert images from PNG, GIF, TIF, SVG, WEBP, and HEIC formats to JPG. Adjust output quality, process multiple files at once, and download as a ZIP.",
    icon: ArrowRightLeft,
    href: "/tools/convert-to-jpg/",
    category: "convert",
    accept: [
      ".png",
      ".gif",
      ".tif",
      ".tiff",
      ".svg",
      ".webp",
      ".heic",
      ".heif",
    ],
    keywords: ["convert", "jpg", "jpeg", "png", "heic", "webp"],
  },
  {
    id: "convert-from-jpg",
    name: "Convert from JPG",
    description: "JPG to PNG, GIF, or animated GIF",
    longDescription:
      "Convert JPG images to PNG for lossless quality, or create animated GIFs from multiple JPG files. Control frame delay and order for animated output.",
    icon: ImageIcon,
    href: "/tools/convert-from-jpg/",
    category: "convert",
    accept: [".jpg", ".jpeg"],
    keywords: [
      "convert",
      "jpg",
      "png",
      "gif",
      "animated",
      "animation",
    ],
  },
  {
    id: "photo-editor",
    name: "Photo Editor",
    description: "Text, effects, frames, stickers & more",
    longDescription:
      "A full-featured photo editor in your browser. Add text with custom fonts, apply effects like blur and sepia, add stickers and frames, adjust brightness and contrast, with full undo/redo support.",
    icon: Paintbrush,
    href: "/tools/photo-editor/",
    category: "edit",
    accept: [".jpg", ".jpeg", ".png", ".gif"],
    keywords: [
      "edit",
      "text",
      "effects",
      "frames",
      "stickers",
      "filters",
    ],
  },
  {
    id: "upscale-image",
    name: "Upscale Image",
    description: "AI-powered 2x or 4x image upscaling",
    longDescription:
      "Enlarge images using AI-powered upscaling with Real-ESRGAN. Choose 2x or 4x enlargement. All processing happens in your browser — your images never leave your device.",
    icon: Sparkles,
    href: "/tools/upscale-image/",
    category: "ai",
    isNew: true,
    accept: [".jpg", ".jpeg", ".png"],
    keywords: ["upscale", "enlarge", "ai", "super resolution", "4k"],
  },
  {
    id: "remove-background",
    name: "Remove Background",
    description: "AI background removal — transparent PNG output",
    longDescription:
      "Remove image backgrounds automatically using AI. Outputs transparent PNG. Option to fill with a custom color. All processing is done locally in your browser using ONNX models.",
    icon: Eraser,
    href: "/tools/remove-background/",
    category: "ai",
    isNew: true,
    accept: [".jpg", ".jpeg", ".png"],
    keywords: [
      "remove background",
      "transparent",
      "png",
      "ai",
      "cutout",
    ],
  },
  {
    id: "watermark-image",
    name: "Watermark Image",
    description: "Add text or image watermarks to photos",
    longDescription:
      "Protect your images with watermarks. Add text watermarks with custom font, size, color, opacity, and rotation. Or upload a logo image watermark. Batch-process multiple images at once.",
    icon: Droplets,
    href: "/tools/watermark-image/",
    category: "edit",
    accept: [".jpg", ".jpeg", ".png"],
    keywords: [
      "watermark",
      "protect",
      "copyright",
      "logo",
      "text overlay",
    ],
  },
  {
    id: "meme-generator",
    name: "Meme Generator",
    description: "50+ templates + custom upload memes",
    longDescription:
      "Create memes with 50+ popular templates or upload your own image. Add top and bottom text with Impact font, customize size, color, and outline. Download as PNG.",
    icon: Laugh,
    href: "/tools/meme-generator/",
    category: "edit",
    accept: [".jpg", ".jpeg", ".png", ".gif"],
    keywords: ["meme", "funny", "caption", "template", "impact"],
  },
  {
    id: "rotate-image",
    name: "Rotate Image",
    description: "Rotate, flip, and batch-orient images",
    longDescription:
      "Rotate images left or right by 90 degrees, flip horizontally or vertically, or set a custom angle. Batch mode lets you apply settings to all images or filter by landscape/portrait orientation.",
    icon: RotateCw,
    href: "/tools/rotate-image/",
    category: "image",
    accept: [".jpg", ".jpeg", ".png", ".gif"],
    keywords: ["rotate", "flip", "orientation", "landscape", "portrait"],
  },
  {
    id: "html-to-image",
    name: "HTML to Image",
    description: "Convert HTML/CSS code to JPG or SVG",
    longDescription:
      "Paste HTML and CSS code to render it as an image. Supports multiple viewport widths for responsive testing. Export as JPG or SVG. All rendering happens in your browser.",
    icon: Code,
    href: "/tools/html-to-image/",
    category: "convert",
    accept: [],
    keywords: ["html", "css", "screenshot", "render", "code to image"],
  },
  {
    id: "blur-face",
    name: "Blur Face",
    description: "AI face detection with blur or pixelate",
    longDescription:
      "Automatically detect faces in images using AI and blur or pixelate them for privacy. Adjustable blur intensity. Supports batch processing of multiple images.",
    icon: ScanFace,
    href: "/tools/blur-face/",
    category: "ai",
    isNew: true,
    accept: [".jpg", ".jpeg", ".png"],
    keywords: [
      "blur face",
      "privacy",
      "pixelate",
      "ai",
      "face detection",
    ],
  },
];

export function getToolById(id: string): ToolMeta | undefined {
  return tools.find((t) => t.id === id);
}

export function getToolsByCategory(category: string): ToolMeta[] {
  return tools.filter((t) => t.category === category);
}

export function getRelatedTools(
  currentId: string,
  count = 4
): ToolMeta[] {
  return tools.filter((t) => t.id !== currentId).slice(0, count);
}

export const categoryLabels: Record<string, string> = {
  image: "Image Editing",
  convert: "Convert",
  edit: "Edit & Create",
  ai: "AI Tools",
};
