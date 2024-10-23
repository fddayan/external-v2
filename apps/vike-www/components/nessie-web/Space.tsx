import React from "react";
import { Space as NessieSpace, NessieThemeProvider } from "@classdojo/web/nessie";

export const Space = (props: any) => {
  return (
    <NessieThemeProvider>
      <NessieSpace {...props} />
    </NessieThemeProvider>
  );
};
