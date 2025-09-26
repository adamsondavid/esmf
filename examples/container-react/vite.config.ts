import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dynamicImportmap from "vite-plugin-dynamic-importmap";

export default defineConfig({
  build: {
    rollupOptions: {
      external: ["react", "react-dom", "react-dom/client", "react/jsx-runtime"],
    },
  },
  plugins: [dynamicImportmap({ importmap: "importmap.json" }), react()],
});
