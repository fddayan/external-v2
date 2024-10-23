import React from "react";
import { ListItem as NessieListItem, NessieThemeProvider } from "@classdojo/web/nessie";

export const ListItem = (props: any) => {
  return (
    <NessieThemeProvider>
      <NessieListItem {...props} />
    </NessieThemeProvider>
  );
};
