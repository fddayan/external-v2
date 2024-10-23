import React from "react";
import { TextArea as NessieTextArea, NessieThemeProvider } from "@classdojo/web/nessie";

export const TextArea = (props: any) => {
  return (
    <NessieThemeProvider>
      <NessieTextArea {...props} />
    </NessieThemeProvider>
  );
};
