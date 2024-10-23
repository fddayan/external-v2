import React from "react";
import { NumberBadge as NessieNumberBadge, NessieThemeProvider } from "@classdojo/web/nessie";

export const NessieNumber = (props: any) => {
  return (
    <NessieThemeProvider>
      <NessieNumberBadge {...props} />
    </NessieThemeProvider>
  );
};
