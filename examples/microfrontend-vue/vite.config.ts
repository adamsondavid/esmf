import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import injectCss from "vite-plugin-css-injected-by-js";

export default defineConfig({
  server: {
    cors: true,
  },
  build: {
    assetsInlineLimit: Infinity,
    rollupOptions: {
      // TODO: should we extract this into our own vite plugin??
      input: "src/esmf.main.ts",
      output: {
        entryFileNames: "main.js",
      },
      preserveEntrySignatures: "exports-only",
      external: ["vue"],
    },
  },
  plugins: [injectCss(), vue()],
});
