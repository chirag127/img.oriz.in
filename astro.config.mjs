import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import partytown from "@astrojs/partytown";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  output: "static",
  site: "https://img.oriz.in",
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
  },
  build: {
    assets: "_assets",
  },
});
