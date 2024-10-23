import React from "react";
import { DetailHeading as NessieDetailHeading, NessieThemeProvider } from "@classdojo/web/nessie";

export const DetailHeading = (props: any) => {
  return (
    <NessieThemeProvider>
      <NessieDetailHeading {...props} />
    </NessieThemeProvider>
  );
};
