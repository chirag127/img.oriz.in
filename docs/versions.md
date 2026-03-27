# oriz - Image Tools Suite

A fully static, zero-hosting-cost, Google AdSense-ready image processing web application deployed on Cloudflare Pages.

## Project Structure

```
pdf-oriz-in/
├── .github/workflows/     # CI/CD pipelines
├── public/               # Static assets
├── src/
│   ├── components/       # UI components
│   │   ├── layout/       # Header, Footer, ThemeToggle
│   │   ├── tools/        # 13 tool components
│   │   └── ui/           # DropZone, Slider, ProgressBar, etc.
│   ├── layouts/          # Base, ToolLayout
│   ├── lib/              # imageUtils, toolMeta
│   ├── pages/            # All routes
│   └── styles/           # global.css
├── astro.config.mjs
├── package.json
└── README.md
```

## Technology Stack

| Package | Version | Notes |
|---|---|---|
| astro | 6.1.1 | Acquired by Cloudflare |
| @astrojs/react | 5.0.2 | React islands |
| @astrojs/cloudflare | 13.1.4 | Edge deployment |
| @astrojs/partytown | 2.1.6 | AdSense web worker |
| @astrojs/sitemap | 3.7.2 | Auto-sitemap |
| tailwindcss | 4.2.2 | CSS-first config |
| @tailwindcss/vite | 4.x | Vite plugin |
| react | 19.2.4 | Latest |
| lucide-react | 1.7.0 | Icons |
| browser-image-compression | 2.0.2 | Image compression |
| fabric | 7.2.0 | Canvas editor |
| react-image-crop | 11.0.10 | Crop tool |
| gif.js | 0.2.0 | GIF encoding |
| heic2any | 0.0.4 | HEIC conversion |
| svgo | 4.0.1 | SVG optimization |
| @imgly/background-removal | 1.7.0 | AI BG removal |
| face-api.js | 0.22.2 | Face detection |
| html2canvas | 1.4.1 | HTML to image |
| jszip | 3.10.1 | Bulk download |
| @biomejs/biome | 2.4.9 | Linting |
| typescript | 5.9.3 | Type safety |
| vitest | 4.1.2 | Unit testing |
| @playwright/test | 1.58.2 | E2E testing |
| wrangler | 4.77.0 | Cloudflare CLI |

## Cloudflare Pages Free Tier

- 500 builds/month
- Unlimited bandwidth
- Unlimited HTTP requests
- 100 custom domains
- Global CDN
- Zero cost

## Getting Started

```bash
pnpm install
pnpm dev
```

## Deployment

Push to main triggers CI/CD to Cloudflare Pages.
