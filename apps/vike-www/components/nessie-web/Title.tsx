import React from "react";
import { Title as NessieTitle, NessieThemeProvider } from "@classdojo/web/nessie";

export const Title = (props: any) => {
  return (
    <NessieThemeProvider>
      <NessieTitle {...props} />
    </NessieThemeProvider>
  );
};
