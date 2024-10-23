import React from "react";
import { Button, Space } from "@src/components/nessie-web";
import Translate from "@src/components/translation/Translate";

const DownloadAppButton = ({ buttonHref, translationPath }) => {
  return (
    <>
      <Space size="s" />
      <Button href={buttonHref} kind="secondary" size="s">
        <Translate path={translationPath} />
      </Button>
      <Space size="s" />
    </>
  );
};

export default DownloadAppButton;
