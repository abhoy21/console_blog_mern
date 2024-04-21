// client/vite.config.js

import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        secure: false,
      },
    },
  },
  plugins: [react()],
  build: {
    outDir: "../public", // This will place the build output in the "public" directory
  },
});
