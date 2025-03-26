import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "robots.txt", "apple-touch-icon.png"],
      manifest: {
        name: "My Memo",
        short_name: "My Memo",
        description: "A simple way to save and review your memos anytime.",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "MyMemo-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "MyMemo-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "MyMemo-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
  server: {
    port: 3000,
    open: true,
    host: true,
  },
});
