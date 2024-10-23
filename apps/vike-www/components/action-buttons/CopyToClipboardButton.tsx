import React, { useState } from "react";
import { Button } from "@src/components/nessie-web";

type CopyToClipboardButtonProps = {
  icon?: any;
  dataToBeCopied: string;
  hideText?: boolean;
};

const CopyToClipboardButton: React.FC<CopyToClipboardButtonProps> = ({ dataToBeCopied, icon, hideText }) => {
  const [copyMessage, setCopyMessage] = useState("Copy to clipboard");

  const copyToClipboard = (copyText: string, handleBtnLabel: (message: string) => void) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(copyText).then(
        () => {
          handleBtnLabel("Copied!");
          setTimeout(() => handleBtnLabel("Copy to clipboard"), 800);
        },
        (error) => {
          console.log(error);
        },
      );
    }
  };
  return (
    <Button icon={icon} onClick={() => copyToClipboard(dataToBeCopied, setCopyMessage)}>
      {hideText ? "" : copyMessage}
    </Button>
  );
};

export default CopyToClipboardButton;
