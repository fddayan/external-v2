import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import typedCssModules from "@web-monorepo/vite-typed-css-modules-plugin";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), typedCssModules()],
  css: {
    modules: {
      hashPrefix: "dss-",
    },
  },
  resolve: {
    alias: {
      "#src": path.resolve(__dirname, "src"),
      "#plugins": path.resolve(__dirname, "plugins"),
    },
  },
});
