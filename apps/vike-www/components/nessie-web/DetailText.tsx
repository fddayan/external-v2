import React from "react";
import { DetailText as NessieDetailText, NessieThemeProvider } from "@classdojo/web/nessie";

export const DetailText = (props: any) => {
  return (
    <NessieThemeProvider>
      <NessieDetailText {...props} />
    </NessieThemeProvider>
  );
};
