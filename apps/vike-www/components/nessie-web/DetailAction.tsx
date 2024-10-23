import React from "react";
import { DetailAction as NessieDetailAction, NessieThemeProvider } from "@classdojo/web/nessie";

export const DetailAction = (props: any) => {
  return (
    <NessieThemeProvider>
      <NessieDetailAction {...props} />
    </NessieThemeProvider>
  );
};
