import React from "react";
import { NessieThemeProvider } from "@classdojo/web/nessie";
import { CloseIcon as NessieCloseIcon } from "@classdojo/web/nessie/icons";

export const CloseIcon = (props: any) => {
  return (
    <NessieThemeProvider>
      <NessieCloseIcon {...props} />
    </NessieThemeProvider>
  );
};
