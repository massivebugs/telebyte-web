import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import basicSsl from "@vitejs/plugin-basic-ssl";
import { generateSkywayTokensPlugin } from "./plugins/generate-skyway-tokens";

export default defineConfig({
  plugins: [
    basicSsl(),
    VitePWA({ registerType: "autoUpdate" }),
    generateSkywayTokensPlugin(),
  ],
  build: {
    minify: "terser",
    rollupOptions: {
      input: {
        command: "./command.html",
        control: "./control.html",
      },
    },
  },
});
