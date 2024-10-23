import React from "react";
import { Caption as NessieCaption, NessieThemeProvider } from "@classdojo/web/nessie";

export const Caption = (props: any) => {
  return (
    <NessieThemeProvider>
      <NessieCaption {...props} />
    </NessieThemeProvider>
  );
};
