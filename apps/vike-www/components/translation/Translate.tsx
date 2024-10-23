import React, { useContext } from "react";
import { TranslationContext } from "./TranslationContext";

type TranslateProps = {
  path?: string;
  fallback?: string;
  subs?: Record<string, string>;
  locale?: boolean;
};
const Translate = ({ path, subs, locale, fallback }: TranslateProps) => {
  const translation = useContext(TranslationContext);
  const html = locale
    ? translation.translateLocale?.()
    : translation.translateWithFallback({ str: path, subs, fallback });
  return <>{html}</>;
};

export default Translate;
