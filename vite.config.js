import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 5173,
    open: true,
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        about: resolve(__dirname, "a-propos.html"),
        skills: resolve(__dirname, "competences.html"),
        cv: resolve(__dirname, "cv.html"),
        certificates: resolve(__dirname, "certificats.html"),
        contact: resolve(__dirname, "contact.html"),
      },
    },
  },
});
