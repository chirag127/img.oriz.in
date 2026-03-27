<!-- markdownlint-disable MD041 -->
<p align="center">
  <img src="https://raw.githubusercontent.com/chirag127/img.oriz.in/main/public/favicon.svg" alt="oriz logo" width="80" height="80" />
</p>

<h1 align="center">oriz - Free Online Image Tools</h1>

<p align="center">
  <a href="https://pdf.oriz.in"><strong>Live Site</strong></a> |
  <a href="https://github.com/chirag127/img.oriz-in/actions/workflows/ci.yml"><img src="https://github.com/chirag127/img.oriz-in/actions/workflows/ci.yml/badge.svg" alt="CI Status" /></a> |
  <a href="https://github.com/chirag127/img.oriz-in/blob/main/LICENSE"><img src="https://img.shields.io/github/license/chirag127/img.oriz-in" alt="License" /></a>
</p>

> 16 powerful image tools. All run 100% in your browser. Your images never leave your device.

## Features

All image processing happens client-side using WebAssembly and browser APIs - no server uploads required.

### Image Editing
- [Compress Image](https://pdf.oriz.in/tools/compress-image/) - Reduce file size without quality loss
- [Resize Image](https://pdf.oriz.in/tools/resize-image/) - Change dimensions by pixels or percentage
- [Crop Image](https://pdf.oriz.in/tools/crop-image/) - Visual drag-to-crop editor
- [Rotate Image](https://pdf.oriz.in/tools/rotate-image/) - Rotate, flip, and batch-orient
- [Watermark Image](https://pdf.oriz.in/tools/watermark-image/) - Add text or image watermarks

### Convert
- [Convert to JPG](https://pdf.oriz.in/tools/convert-to-jpg/) - PNG, GIF, WEBP, HEIC to JPG
- [Convert from JPG](https://pdf.oriz.in/tools/convert-from-jpg/) - JPG to PNG or animated GIF
- [HTML to Image](https://pdf.oriz.in/tools/html-to-image/) - Convert HTML/CSS to JPG or SVG

### Edit & Create
- [Photo Editor](https://pdf.oriz.in/tools/photo-editor/) - Text, effects, frames, stickers
- [Meme Generator](https://pdf.oriz.in/tools/meme-generator/) - 50+ templates + custom upload

### AI Tools
- [Upscale Image](https://pdf.oriz.in/tools/upscale-image/) - AI-powered 2x/4x enlargement
- [Remove Background](https://pdf.oriz.in/tools/remove-background/) - Automatic background removal
- [Blur Face](https://pdf.oriz.in/tools/blur-face/) - Privacy protection with face detection

## Tech Stack

| Category | Technology |
|---|---|
| Framework | Astro 6 |
| UI Islands | React 19 |
| Styling | Tailwind CSS v4 |
| Type Safety | TypeScript 5.x |
| Image Processing | browser-image-compression, Fabric.js, react-image-crop |
| AI/ML | @imgly/background-removal, face-api.js |
| Icons | Lucide React |
| Hosting | Cloudflare Pages |
| Testing | Vitest + Playwright |
| Linting | Biome.js |

## Why Browser-Based?

1. **100% Private** - Your images never leave your device
2. **Lightning Fast** - No upload/download wait times
3. **Works Offline** - Use tools even without internet
4. **Free Forever** - No server costs = no paywall

## Getting Started

### Prerequisites

- Node.js 22+
- pnpm 10+

### Installation

```bash
# Clone the repository
git clone https://github.com/chirag127/img.oriz-in.git
cd img.oriz-in

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### Available Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm preview      # Preview production build
pnpm lint         # Run Biome linter
pnpm typecheck   # Run TypeScript type checker
pnpm test         # Run Vitest unit tests
pnpm test:e2e    # Run Playwright E2E tests
```

## Environment Variables

Create a `.env` file:

```env
# Google AdSense (optional - for monetization)
PUBLIC_ADSENSE_ID=ca-pub-XXXXXXXXXXXXXXXXX

# Cloudflare (for deployment - add via GitHub Secrets)
CLOUDFLARE_API_TOKEN=
CLOUDFLARE_ACCOUNT_ID=
```

## Deployment

The site deploys automatically via GitHub Actions to Cloudflare Pages on push to main.

### Manual Deploy

```bash
# Build
pnpm build

# Deploy to Cloudflare Pages
wrangler pages deploy dist --project-name=pdf-oriz-in
```

### Custom Domain

1. Add CNAME record in Cloudflare DNS: `pdf` -> `pdf-oriz-in.pages.dev`
2. In Cloudflare Pages: Add custom domain `pdf.oriz.in`

## Privacy

All image processing happens 100% client-side. We never upload your images to any server. See [Privacy Policy](https://pdf.oriz.in/privacy/).

## Contributing

Contributions are welcome! Please read our [contributing guidelines](CONTRIBUTING.md) first.

1. Fork the repo
2. Create a feature branch
3. Make your changes
4. Run tests and lint
5. Submit a PR

## License

MIT License - see [LICENSE](LICENSE) for details.

## Acknowledgments

- [Lucide](https://lucide.dev) for beautiful icons
- [Cloudflare](https://cloudflare.com) for free hosting
- [Astro](https://astro.build) for the amazing framework
