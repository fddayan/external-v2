import React from "react";
import { Tooltip as NessieTooltip, NessieThemeProvider } from "@classdojo/web/nessie";

export const Tooltip = (props: any) => {
  return (
    <NessieThemeProvider>
      <NessieTooltip {...props} />
    </NessieThemeProvider>
  );
};
