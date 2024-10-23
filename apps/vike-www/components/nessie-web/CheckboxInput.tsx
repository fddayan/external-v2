import React from "react";
import {
  InputGroup as NessieInputGroup,
  CheckboxInput as NessieCheckboxInput,
  NessieThemeProvider,
} from "@classdojo/web/nessie";

export const InputGroup = (props: any) => {
  return (
    <NessieThemeProvider>
      <NessieInputGroup {...props} />
    </NessieThemeProvider>
  );
};

export const CheckboxInput = (props: any) => {
  return (
    <NessieThemeProvider>
      <NessieCheckboxInput {...props} />
    </NessieThemeProvider>
  );
};
