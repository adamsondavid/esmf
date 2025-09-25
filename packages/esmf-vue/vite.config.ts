import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: "src/index.ts",
      fileName: "index",
      formats: ["es"],
    },
    rollupOptions: {
      external: ["esmf-js", "vue"],
    },
  },
  plugins: [
    dts({
      include: ["src"],
      rollupTypes: true,
    }),
    vue(),
  ],
});
