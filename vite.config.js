import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import { resolve } from "path";
export default defineConfig({
  plugins: [
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      devOptions: {
        enabled: true,
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
      },
      manifest: {
        theme_color: "#f5f5f5",
        background_color: "#1e212b",
        display: "fullscreen",
        scope: "/",
        start_url: "/",
        name: "Quotes app",
        short_name: "Quote",
        description: "Get all inspiring quotes in just one place ",
        id: "/",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
  ],
  build: {
    target: ["edge90", "chrome90", "firefox90", "safari15"],
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        admin: resolve(__dirname, "movies/films.html"),
      },
    },
    //     rollupOptions: {
    //       input: {
    //         // the default entry point
    //         app: "./index.html",

    //         // 1️⃣
    //         "service-worker": "./service-worker.js",
    //       },
    //       output: {
    //         // 2️⃣
    //         entryFileNames: (assetInfo) => {
    //           return assetInfo.name === "service-worker"
    //             ? "[name].js" // put service worker in root
    //             : "assets/js/[name]-[hash].js"; // others in `assets/js/`
    //         },
    //       },
    //     },
  },
});
