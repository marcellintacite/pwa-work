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
