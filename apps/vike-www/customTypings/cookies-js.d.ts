declare module "cookies-js" {
  const get: (cookieName: string) => string | null;
  const set: (
    cookieName: string,
    value: string,
    options: { expires: number }
  ) => void;
  const expire: (cookieName: string) => void;
  export default { get, set, expire };
}
