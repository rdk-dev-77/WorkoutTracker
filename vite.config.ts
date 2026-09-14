import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// Base precisa bater com o nome do repositório no GitHub Pages:
// https://rdk-dev-77.github.io/WorkoutTracker/
const base = "/WorkoutTracker/";

export default defineConfig({
  base,
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["apple-touch-icon.png"],
      manifest: {
        name: "WorkoutTracker",
        short_name: "Treinos",
        description: "Controle de treinos de academia",
        theme_color: "#111111",
        background_color: "#111111",
        display: "standalone",
        start_url: base,
        scope: base,
        icons: [
          { src: "icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "icon-512.png", sizes: "512x512", type: "image/png" },
        ],
      },
    }),
  ],
});
