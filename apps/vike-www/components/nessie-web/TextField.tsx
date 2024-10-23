import React from "react";
import { TextField as NessieTextField, NessieThemeProvider } from "@classdojo/web/nessie";

export const TextField = (props: any) => {
  return (
    <NessieThemeProvider>
      <NessieTextField {...props} />
    </NessieThemeProvider>
  );
};
