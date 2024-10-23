import { get } from "lodash";

export type pageContext = {
  [key: string]: any;
};

export default function getLocale(pageContext: pageContext): string {
  const userLanguageOriginal = get(pageContext, ["localeStrings", "currentLocale"], "en-us").toLowerCase();
  const userLanguage = userLanguageOriginal === "en" ? "en-us" : userLanguageOriginal;
  return userLanguage;
}
