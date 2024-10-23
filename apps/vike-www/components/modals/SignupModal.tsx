import React, { useContext, useEffect } from "react";
import ConstituentButtons, { ConstituentButtonsType } from "../ConstituentButtons";
import CommonModal, { CommonModalProps } from "./CommonModal";
import { TranslationContext } from "../translation/TranslationContext";
import { logEvent, incrementMetric } from "@src/utils/logClient";

const SignupModal = (props: CommonModalProps) => {
  const t = useContext(TranslationContext);

  useEffect(() => {
    logEvent("externalPage.click_signup");
    incrementMetric("external_site.view_signup_modal");
  });

  return (
    <CommonModal
      modalDialogStyle={{ maxWidth: "720px !important" }}
      headerText={t.translate("components.signup_picker.as_a")}
      {...props}
    >
      <ConstituentButtons
        responsive
        type={ConstituentButtonsType.SIGNUP}
        buttonLocation="header"
        closeModal={props.closeModal}
      />
    </CommonModal>
  );
};

export default SignupModal;
