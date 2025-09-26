import { defineConfig } from "vite";
import injectCss from "vite-plugin-css-injected-by-js";
import react from "@vitejs/plugin-react";

export default defineConfig({
  preview: {
    cors: true,
  },
  // TODO: should we extract this into our own vite plugin??
  build: {
    rollupOptions: {
      input: "src/esmf.main.tsx",
      output: {
        entryFileNames: "main.js",
      },
      preserveEntrySignatures: "exports-only",
      external: ["react", "react-dom", "react-dom/client", "react/jsx-runtime"],
    },
    assetsInlineLimit: Infinity,
  },
  plugins: [injectCss(), react()],
});
