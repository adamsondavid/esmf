import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import react from "@vitejs/plugin-react";

export default defineConfig({
  build: {
    lib: {
      entry: "src/index.ts",
      fileName: "index",
      formats: ["es"],
    },
    rolldownOptions: {
      external: ["esmf-js", "react", "react-dom", "react-dom/client", "react/jsx-runtime"],
    },
  },
  plugins: [dts({ exclude: ["dist"], rollupTypes: true }), react()],
});
