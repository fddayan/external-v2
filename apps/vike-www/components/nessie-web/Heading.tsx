import React from "react";
import { Heading as NessieHeading, NessieThemeProvider } from "@classdojo/web/nessie";

export const Heading = (props: any) => {
  return (
    <NessieThemeProvider>
      <NessieHeading {...props} />
    </NessieThemeProvider>
  );
};
