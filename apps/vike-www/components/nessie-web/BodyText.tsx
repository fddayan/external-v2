import React from "react";
import { BodyText as NessieBodyText, NessieThemeProvider } from "@classdojo/web/nessie";

export const BodyText = (props: any) => {
  return (
    <NessieThemeProvider>
      <NessieBodyText {...props} />
    </NessieThemeProvider>
  );
};
