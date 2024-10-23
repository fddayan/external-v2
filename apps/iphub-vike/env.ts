import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    // NODE_ENV: z.enum(["development", "production"]).optional(),
    DIRECTUS_TOKEN: z.string().min(1),
    DIRECTUS_HOST: z.string().min(1),
  },
  client: {},
  clientPrefix: "CLIENT",
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
  skipValidation:
    !!process.env.CI || process.env.npm_lifecycle_event === "lint",
});
