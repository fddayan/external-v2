import React from "react";
import { Subheading as NessieSubheading, NessieThemeProvider } from "@classdojo/web/nessie";

export const Subheading = (props: any) => {
  return (
    <NessieThemeProvider>
      <NessieSubheading {...props} />
    </NessieThemeProvider>
  );
};
