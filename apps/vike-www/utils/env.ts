const isProd = process.env.GATSBY_ENV === "production";
export function isProduction() {
  return isProd;
}

export function isDev() {
  return !isProd;
}
