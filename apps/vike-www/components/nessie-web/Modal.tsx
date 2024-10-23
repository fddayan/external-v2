import React from "react";
import {
  Modal as NessieModal,
  ModalContent as NessieModalContent,
  ModalTitle as NessieModalTitle,
  ModalCloseButton as NessieModalCloseButton,
  NessieThemeProvider,
} from "@classdojo/web/nessie";

export const Modal = (props: any) => {
  return (
    <NessieThemeProvider>
      <NessieModal {...props} />
    </NessieThemeProvider>
  );
};

export const ModalContent = (props: any) => {
  return (
    <NessieThemeProvider>
      <NessieModalContent {...props} />
    </NessieThemeProvider>
  );
};

export const ModalTitle = (props: any) => {
  return (
    <NessieThemeProvider>
      <NessieModalTitle {...props} />
    </NessieThemeProvider>
  );
};

export const ModalCloseButton = (props: any) => {
  return (
    <NessieThemeProvider>
      <NessieModalCloseButton {...props} />
    </NessieThemeProvider>
  );
};
