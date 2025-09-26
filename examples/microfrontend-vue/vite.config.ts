import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import injectCss from "vite-plugin-css-injected-by-js";

export default defineConfig({
  server: {
    cors: true,
  },
  // TODO: should we extract this into our own vite plugin??
  build: {
    lib: {
      entry: "src/esmf.main.ts",
      fileName: "main",
      formats: ["es"],
    },
    rollupOptions: {
      external: ["vue"],
    },
    assetsInlineLimit: Infinity,
  },
  plugins: [injectCss(), vue()],
});
