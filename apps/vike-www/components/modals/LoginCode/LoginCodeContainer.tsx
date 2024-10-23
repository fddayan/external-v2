import React, { useContext } from "react";
import SendCode from "@src/components/modals/LoginCode/SendCode";
import { useState } from "react";
import { LabelText } from "../../LabelText";
import { OrSeparator } from "../../OrSeparator";
import { BodyText, ChevronRightIcon } from "../../nessie-web";
import CodeVerification from "./CodeVerification";
import { TranslationContext } from "@src/components/translation/TranslationContext";

function LoginCodeContainer({
  email,
  goBackToLogin,
  isUserParent,
  userType,
}: {
  email: string | undefined;
  goBackToLogin: ({ email }: { email: string }) => void;
  isUserParent: boolean;
  userType: "parent" | "teacher" | "leader";
}) {
  const t = useContext(TranslationContext);
  const [codeSent, setCodeSent] = useState(false);
  const [sentEmail, setSentEmail] = useState("");
  const [emailUpdated, setEmailUpdated] = useState(email ?? "");

  return (
    <div style={{ width: "375px", display: "flex", flexDirection: "column", alignItems: "center" }}>
      {!codeSent ? (
        <SendCode
          initialEmail={email}
          sentEmail={sentEmail}
          onCodeSend={({ email }) => {
            setCodeSent(true);
            setSentEmail(email);
          }}
          setEmailUpdated={setEmailUpdated}
        />
      ) : (
        <CodeVerification
          userType={userType}
          changeEmail={() => {
            setCodeSent(false);
          }}
          email={sentEmail}
          isUserParent={isUserParent}
        />
      )}
      <div style={{ marginTop: "18px", width: "100%", maxWidth: "351px" }}>
        <OrSeparator />
        <div
          style={{
            display: "flex",
            gap: "6px",
            justifyContent: "center",
            marginLeft: "20px",
            marginTop: "18px",
            cursor: "pointer",
          }}
        >
          <LabelText
            style={{ marginTop: "dt_m" }}
            onClick={() => {
              goBackToLogin({ email: emailUpdated });
            }}
          >
            <BodyText>{t.translate("components.login.code_login.login_with_password")}</BodyText>
          </LabelText>
          <BodyText>
            <ChevronRightIcon />
          </BodyText>
        </div>
      </div>
    </div>
  );
}

export default LoginCodeContainer;
