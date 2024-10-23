import React from "react";
import get from "lodash/get";
import parse from "html-react-parser";

export type TranslationType = string | JSX.Element | JSX.Element[] | null;
type TranslationContextType = {
  translations?: any;
  translate: (string: string, object?: Record<string, string>) => TranslationType;
  translateWithFallback?: (keyOrObj: string | TranslationParams) => TranslationType;
  translateIfAble?: (string: string, object?: Record<string, string>) => TranslationType;
  translateLocale?: () => string;
  translationLocaleAsString?: () => string;
};

type TranslationParams = {
  str: string;
  subs?: Record<string, string>;
  fallback?: string;
};
const TranslationContext = React.createContext<TranslationContextType>({
  translate: (string: string) => string,
});

type TranslationProviderProps = {
  localeStrings: any;
  children: any;
};
const TranslationProvider: React.FC<TranslationProviderProps> = ({ children, localeStrings }) => {
  function translate(path: string, substitutions?: Record<string, string>): TranslationType {
    let result = get(localeStrings, path, "");
    if (typeof result === "string") {
      if (substitutions) {
        for (const sub in substitutions) {
          result = result.replace(new RegExp(`__${sub}__`, "g"), substitutions[sub]);
        }
      }
      return parse(result); //using parse for now because of this https://github.com/facebook/react/issues/12014
    }
    return null;
  }

  function translateWithFallback(keyOrObj: string | TranslationParams): TranslationType {
    if (typeof keyOrObj === "string") {
      return translate(keyOrObj);
    } else {
      const { str, subs, fallback } = keyOrObj;

      let result = get(localeStrings, str, "");
      if (typeof result === "string") {
        if (result.length === 0 && fallback) {
          result = fallback;
        }
        if (subs) {
          for (const sub in subs) {
            result = result.replace(new RegExp(`__${sub}__`, "g"), subs[sub]);
          }
        }
        return parse(result); //using parse for now because of this https://github.com/facebook/react/issues/12014
      }
      return null;
    }
  }

  function translateIfAble(path: string, substitutions?: Record<string, string>) {
    try {
      const translation = translate(path, substitutions);
      if (typeof translation === "string") return translation;
      else return path;
    } catch (error) {
      return path;
    }
  }

  function translateLocale() {
    let locale = localeStrings ? localeStrings.currentLocale : "en-US";
    if (locale === "en") locale = "en-US";
    return get(localeStrings, `locales.${locale}`, "");
  }

  function translationLocaleAsString() {
    const locale = localeStrings ? localeStrings.currentLocale : "en-US";
    return locale;
  }

  return (
    <TranslationContext.Provider
      value={{
        translations: localeStrings,
        translate,
        translateWithFallback,
        translateIfAble,
        translateLocale,
        translationLocaleAsString,
      }}
    >
      {children}
    </TranslationContext.Provider>
  );
};

export { TranslationProvider, TranslationContext };
