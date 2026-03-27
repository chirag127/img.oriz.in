import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import partytown from "@astrojs/partytown";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  output: "static",
  site: "https://pdf.oriz.in",
  adapter: cloudflare({
    imageService: "passthrough",
  }),
  integrations: [
    react(),
    partytown({
      config: {
        forward: ["googletag.cmd.push", "dataLayer.push"],
      },
    }),
    sitemap(),
  ],
  vite: {
    plugins: [tailwindcss()],
    build: {
      assetsInlineLimit: 0,
    },
    ssr: {
      noExternal: ["svgo"],
    },
  },
  build: {
    assets: "_assets",
  },
});
