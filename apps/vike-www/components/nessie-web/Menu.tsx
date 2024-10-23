import React from "react";
import { DropdownMenu, NessieThemeProvider } from "@classdojo/web/nessie";

export const Menu = (props: any) => {
  return (
    <NessieThemeProvider>
      <DropdownMenu {...props} />
    </NessieThemeProvider>
  );
};
