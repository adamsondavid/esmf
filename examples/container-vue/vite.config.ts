import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  build: {
    rollupOptions: {
      // external: ["vue"], TODO: uncomment once import map is here
    },
  },
  plugins: [vue()],
});
