import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import basicSsl from "@vitejs/plugin-basic-ssl";

export default defineConfig({
  plugins: [basicSsl(), VitePWA({ registerType: "autoUpdate" })],
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
