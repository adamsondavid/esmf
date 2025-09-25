import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  server: {
    cors: true,
  },
  build: {
    assetsInlineLimit: Infinity,
    rollupOptions: {
      input: "src/esmf-main.ts",
      output: {
        entryFileNames: "main.js",
      },
      preserveEntrySignatures: "exports-only",
      // external: ["vue"], TODO: uncomment once import map is here
    },
  },
  plugins: [vue()],
});
