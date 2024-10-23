import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import vike from "vike/plugin";
import { config } from "dotenv";

config();

export default defineConfig({
  plugins: [vike({ prerender: true }), react({})],
});
