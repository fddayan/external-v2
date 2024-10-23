import React from "react";
import { DeprecatedDetailText as NessieDeprecatedDetailText, NessieThemeProvider } from "@classdojo/web/nessie";

export const DeprecatedDetailText = (props: any) => {
  return (
    <NessieThemeProvider>
      <NessieDeprecatedDetailText {...props} />
    </NessieThemeProvider>
  );
};
