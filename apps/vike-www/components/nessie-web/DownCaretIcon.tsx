import React from "react";
import { NessieThemeProvider } from "@classdojo/web/nessie";
import { DownCarrotIcon } from "@classdojo/web/nessie/icons";

export const DownCaretIcon = (props: any) => {
  return (
    <NessieThemeProvider>
      <DownCarrotIcon {...props} />
    </NessieThemeProvider>
  );
};
