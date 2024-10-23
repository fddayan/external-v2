import React, { useContext } from "react";
import CommonModal, { CommonModalProps } from "./CommonModal";
import LoginForm from "./LoginForm";
import { TranslationContext } from "@src/components/translation/TranslationContext";

const ParentLoginModal = (props: CommonModalProps & { emailPrefill?: string }) => {
  const t = useContext(TranslationContext);

  return (
    <CommonModal headerText={t.translate("components.login.log_in_to_classdojo")} {...props}>
      <LoginForm userType="parent" emailPrefill={props.emailPrefill} closeModal={props.closeModal} />
    </CommonModal>
  );
};

export default ParentLoginModal;
