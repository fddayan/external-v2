import React, { useState } from "react";
import { logEvent } from "@src/utils/logClient";
import { Button, CheckmarkIcon, LinkIcon } from "@src/components/nessie-web";
import { css } from "@emotion/react";

interface CopyToClipboardButtonProps {
  dataToBeCopied: string;
  title: string;
  event: any;
}

const CopyToClipboardButton: React.FC<CopyToClipboardButtonProps> = ({ dataToBeCopied, title }) => {
  const [buttonIcon, setButtonIcon] = useState(<LinkIcon />);

  const copyToClipboard = (copyText: string) => {
    if (navigator && navigator.clipboard) {
      logEvent(event);
      navigator.clipboard.writeText(copyText).then(
        () => {
          setButtonIcon(<CheckmarkIcon />);
          setTimeout(() => setButtonIcon(<LinkIcon />), 1200);
        },
        (error) => {
          console.log(error);
        },
      );
    }
  };

  return (
    <Button
      size="s"
      kind="tertiary"
      icon={buttonIcon}
      onClick={() => copyToClipboard(dataToBeCopied)}
      title="Copy link to clipboard"
      css={css({ width: 46 })}
    />
  );
};

export default CopyToClipboardButton;
