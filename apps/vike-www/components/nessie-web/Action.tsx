import React from "react";
import { Action as NessieAction, NessieThemeProvider } from "@classdojo/web/nessie";

export const Action = (props: any) => {
  return (
    <NessieThemeProvider>
      <NessieAction {...props} />
    </NessieThemeProvider>
  );
};
