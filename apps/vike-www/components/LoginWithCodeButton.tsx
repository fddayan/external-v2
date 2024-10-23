import React, { useContext } from "react";
import { BodyText, ChevronRightIcon } from "./nessie-web";
import { LabelText } from "./LabelText";
import { TranslationContext } from "./translation/TranslationContext";

const LoginWithCodeButton = ({ loginWithCode }: { loginWithCode: () => void }) => {
  const t = useContext(TranslationContext);
  return (
    <div style={{ display: "flex", gap: "6px", justifyContent: "center", marginLeft: "20px", marginTop: "18px" }}>
      <LabelText onClick={loginWithCode}>
        <BodyText>{t.translate("components.login.code_login.login_without_password")}</BodyText>
      </LabelText>
      <BodyText>
        <ChevronRightIcon />
      </BodyText>
    </div>
  );
};

export default LoginWithCodeButton;
