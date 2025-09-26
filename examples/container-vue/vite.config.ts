import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dynamicImportmap from "vite-plugin-dynamic-importmap";

export default defineConfig({
  build: {
    rollupOptions: {
      external: ["vue"],
    },
  },
  plugins: [dynamicImportmap({ importmap: "importmap.json" }), vue()],
});
