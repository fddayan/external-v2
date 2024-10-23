import { isProduction } from "@src/utils/env";

let APIDomain: string;
if (isProduction()) {
  APIDomain =
    process.env.GATSBY_BUILD_WEBSITE === "ideas"
      ? process.env.GATSBY_IDEAS_API_URL || ""
      : process.env.GATSBY_API_URL || "";
} else {
  APIDomain = "";
}

export { APIDomain };
