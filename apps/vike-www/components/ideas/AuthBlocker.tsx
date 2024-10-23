import React, { useContext } from "react";
import { AppDataContext } from "@src/components/AppDataContext";
import { ModalContext, ModalType } from "@src/components/modals/ModalController";

const AuthBlocker = ({ children }: { children: JSX.Element }) => {
  const appData = useContext(AppDataContext);
  const modals = useContext(ModalContext);

  if (!appData.data.userData) {
    modals.showModal(ModalType.Login);
    return null;
  }

  return <>{children}</>;
};

export default AuthBlocker;
