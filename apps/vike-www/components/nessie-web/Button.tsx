import React from "react";
import { Button as NessieButton, NessieThemeProvider } from "@classdojo/web/nessie";
import { navigate } from "gatsby";
import { getRelativePath } from "@src/utils/routes";

export const Button = (props: any) => {
  if (props.navigateTo) {
    const interceptAndNavigate = (event: { preventDefault: () => void }) => {
      props.onClick && props.onClick();
      event.preventDefault();
      navigate(getRelativePath(props.navigateTo));
    };
    return (
      <NessieThemeProvider>
        <NessieButton {...props} href={getRelativePath(props.navigateTo)} onClick={interceptAndNavigate} />
      </NessieThemeProvider>
    );
  } else {
    return (
      <NessieThemeProvider>
        <NessieButton {...props} />
      </NessieThemeProvider>
    );
  }
};
