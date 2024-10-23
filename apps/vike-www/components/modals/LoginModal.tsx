import React, { useContext, useEffect } from "react";
import ConstituentButtons, { ConstituentButtonsType } from "../ConstituentButtons";
import CommonModal, { CommonModalProps } from "./CommonModal";
import { TranslationContext } from "@src/components/translation/TranslationContext";
import { incrementMetric } from "@src/utils/logClient";

const LoginModal = (props: CommonModalProps & { noRedirect?: boolean }) => {
  const t = useContext(TranslationContext);

  useEffect(() => {
    incrementMetric("external_site.view_login_modal");
  });

  return (
    <CommonModal
      modalDialogStyle={{ maxWidth: "720px !important" }}
      headerText={t.translate("components.login.log_in_to_classdojo")}
      {...props}
    >
      <ConstituentButtons
        responsive
        type={ConstituentButtonsType.LOGIN}
        buttonLocation="header"
        noRedirect={props.noRedirect}
        closeModal={props.closeModal}
      />
    </CommonModal>
  );
};

export default LoginModal;
