import React, { useContext } from "react";
import { TranslationContext } from "./TranslationContext";
import ReactMarkdown from "react-markdown";
type TranslateProps = {
  path?: string;
  subs?: Record<string, any>;
  locale?: boolean;
  Component?: React.ComponentType<any>;
  debug?: boolean;
};
const MarkedTranslate: React.FC<TranslateProps> = ({
  path,
  subs,
  locale,
  Component,
}) => {
  const translation = useContext(TranslationContext);
  const item = locale
    ? translation.translateLocale().toString()
    : translation.translate(path, subs).toString();
  if (Component) {
    return (
      <Component>
        <ReactMarkdown>{item}</ReactMarkdown>
      </Component>
    );
  }
  return <ReactMarkdown>{item}</ReactMarkdown>;
};

export default MarkedTranslate;
