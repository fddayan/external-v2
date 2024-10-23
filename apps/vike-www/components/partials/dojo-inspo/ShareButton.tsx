import React from "react";
import { Button, SendIcon } from "@src/components/nessie-web";
import { logEvent } from "@src/utils/logClient";

let sharePolyfill: typeof import("share-api-polyfill");

if (typeof navigator !== `undefined`) {
  import("share-api-polyfill").then((module) => {
    sharePolyfill = module.default;
  });
}

interface ShareButtonProps {
  shareData: {
    title: string | undefined;
    text: string | undefined;
    url: string | undefined;
    image: string;
  };
  slug: string;
  language: string;
}

const ShareButton: React.FC<ShareButtonProps> = (props) => {
  const shareAction = () => {
    if (navigator && navigator.share && props.shareData.url) {
      navigator.share(props.shareData);
    } else {
      sharePolyfill(props.shareData);
    }
    logEvent({
      eventName: `web.external.activity_corner.share`,
      eventValue: props.slug,
      metadata: { language: props.language },
    });
  };

  return (
    <Button icon={<SendIcon />} onClick={shareAction}>
      Share
    </Button>
  );
};

export default ShareButton;
