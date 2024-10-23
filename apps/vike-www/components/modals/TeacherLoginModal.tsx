import React, { useContext, useState } from "react";
import CommonModal, { CommonModalProps } from "./CommonModal";
import LoginForm from "./LoginForm";
import { TranslationContext } from "@src/components/translation/TranslationContext";

const TeacherLoginModal = (
  props: CommonModalProps & {
    form: { signToWatch: string };
    noRedirect?: boolean;
    emailPrefill: string;
  },
) => {
  const [headerDisabled, setHeaderDisabled] = useState(false);
  const t = useContext(TranslationContext);

  return (
    <CommonModal
      headerText={headerDisabled ? undefined : t.translate("components.login.log_in_to_classdojo")}
      {...props}
    >
      <LoginForm
        userType="teacher"
        closeModal={props.closeModal}
        {...props.form}
        noRedirect={props.noRedirect}
        emailPrefill={props.emailPrefill}
        disableHeader={setHeaderDisabled}
        showCodeLogin
      />
    </CommonModal>
  );
};

export default TeacherLoginModal;
