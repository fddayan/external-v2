import { env } from "../env";

export const getDirectusConfig = () => ({
  host: env.DIRECTUS_HOST,
  token: env.DIRECTUS_TOKEN,
});
