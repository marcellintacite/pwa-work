import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

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
            src: "/maskable_icon_x512.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icon-256x256.png",
            sizes: "256x256",
            type: "image/png",
          },
          {
            src: "/icon-384x384.png",
            sizes: "384x384",
            type: "image/png",
          },
          {
            src: "/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  build: {
    target: ["edge90", "chrome90", "firefox90", "safari15"],

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
