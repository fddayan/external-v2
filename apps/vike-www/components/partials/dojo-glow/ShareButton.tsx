import React from "react";
import { buildEventLog, ButtonPrimary } from "./styles";
import { logEvent } from "@src/utils/logClient";
import { useDojoGlow } from "./context";

let sharePolyfill: typeof import("share-api-polyfill");

if (typeof navigator !== `undefined`) {
  import("share-api-polyfill").then((module) => {
    sharePolyfill = module.default;
  });
}

interface ShareButtonProps {
  label: string;
  slug: string;
  language: string;
  url: string;
  eventName: string;
}

export const ShareButton = ({ label, slug, language, url, eventName }: ShareButtonProps) => {
  const { share } = useDojoGlow();
  const shareAction = () => {
    if (navigator && navigator.share && url) {
      navigator.share({ ...share, url });
    } else {
      sharePolyfill(share);
    }
    logEvent({
      eventName: `web.external.dojo_glow.share.${eventName}`,
      eventValue: slug,
      metadata: { language },
    });
  };

  return (
    <ButtonPrimary variant="primary" onClick={shareAction} eventLog={buildEventLog("share")}>
      {label}
    </ButtonPrimary>
  );
};
