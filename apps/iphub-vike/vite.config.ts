import react from "@vitejs/plugin-react";
import { defineConfig, UserConfig } from "vite";
import vike from "vike/plugin";
import { config } from "dotenv";
import { existsSync, readFileSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

config();

const getServer = () => {
  const root = dirname(fileURLToPath(import.meta.url));
  const port = process.env.PORT ? parseInt(process.env.PORT) : 8084;
  const sslDir = resolve(root, "../../spa-foundation/.ssl");

  const https = existsSync(sslDir)
    ? {
        cert: readFileSync(`${sslDir}/classdojo.test.cert.pem`, "utf-8"),
        key: readFileSync(`${sslDir}/classdojo.test.key.pem`, "utf-8"),
      }
    : undefined;

  const server: UserConfig["server"] = {
    host: "teach.classdojo.test",
    port,
    https,
    fs: {
      allow: [".."],
    },
    proxy: {
      "/api": {
        target: process.env.API_ENDPOINT || `http://api.classdojo.test:8001`,
        changeOrigin: true,
        secure: false,
        xfwd: true,
        autoRewrite: true,
      },
      "/locales": {
        target: process.env.API_ENDPOINT || `http://api.classdojo.test:8001`,
        xfwd: true,
        changeOrigin: true,
        secure: false,
        autoRewrite: true,
      },
    },
  };

  return server;
};

export default defineConfig(() => {
  const server = getServer();

  return defineConfig({
    server,
    plugins: [vike({ prerender: true }), react({})],
  });
});

// export default defineConfig({
//   plugins: [vike({ prerender: true }), react({})],
// });
