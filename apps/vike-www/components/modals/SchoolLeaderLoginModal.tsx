import React, { useContext, useState } from "react";
import CommonModal, { CommonModalProps } from "./CommonModal";
import LoginForm from "./LoginForm";
import { TranslationContext } from "@src/components/translation/TranslationContext";

const SchoolLeaderLoginModal = (props: CommonModalProps & { noRedirect?: boolean }) => {
  const t = useContext(TranslationContext);

  const [headerDisabled, setHeaderDisabled] = useState(false);
  return (
    <CommonModal
      headerText={headerDisabled ? undefined : t.translate("components.login.log_in_to_classdojo")}
      {...props}
    >
      <LoginForm
        userType="leader"
        closeModal={props.closeModal}
        noRedirect={props.noRedirect}
        showCodeLogin
        disableHeader={setHeaderDisabled}
      />
    </CommonModal>
  );
};

export default SchoolLeaderLoginModal;
