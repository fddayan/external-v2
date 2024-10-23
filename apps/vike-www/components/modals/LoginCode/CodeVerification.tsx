import React from "react";
import styled from "@emotion/styled";
import { LabelText } from "@src/components/LabelText";
import Input from "@src/components/forms/Input";
import { Button } from "@src/components/nessie-web";
import { TranslationContext } from "@src/components/translation/TranslationContext";
import { logEvent as le } from "@src/utils/logClient";
import { sendOneTimeCode } from "@src/utils/requests/alternativeAccessMethods";
import { useFormik } from "formik";
import { navigate } from "gatsby";
import { useContext, useEffect, useState } from "react";
import { AppDataContext } from "@src/components/AppDataContext";
import { login } from "@src/utils/axiosLogin";

const HeadlineText = styled.h1`
  font-family: ProximaNova, "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 28px;
  font-style: normal;
  font-weight: 800;
  line-height: 36px;
  letter-spacing: -0.2px;
`;
function CodeVerification({
  email,
  password,
  changeEmail,
  headerText,
  isUserParent,
  userType,
}: {
  email: string;
  password?: string;
  changeEmail?: () => void;
  headerText?: string;
  isUserParent: boolean;
  userType: "parent" | "teacher" | "leader";
}) {
  const t = useContext(TranslationContext);
  const [loginLoading, setLoginLoading] = useState(false);
  const [countDown, setCountDown] = useState(30);
  const {
    data: { geolocation },
  } = useContext(AppDataContext);
  const shortSession = isUserParent && geolocation?.state === "ny";

  useEffect(() => {
    le({
      eventName: "web.external_page.login.detected_state",
      eventValue: geolocation && geolocation.state,
    });
  }, []);

  useEffect(() => {
    if (countDown === 0) {
      return;
    }
    const interval = setInterval(() => {
      setCountDown(countDown - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [countDown]);

  const form = useFormik({
    initialValues: {
      code: "",
    },
    validateOnChange: false,
    validate: (values) => {
      const codeRe = /^\d+$/;
      if (!values.code) {
        return { code: t.translate("components.login.code_login.required") };
      } else if (!codeRe.test(values.code)) {
        return { code: t.translate("components.login.code_login.invalid_code") };
      }
      return {};
    },
    onSubmit: async ({ code }, { validateForm, setFieldError }) => {
      const errors = await validateForm({ code });
      if (errors.code) {
        return;
      }
      setLoginLoading(true);
      try {
        const loginRes = await login({ login: email, longSession: !shortSession, password, userType, code });

        let redirectUrl = process.env.GATSBY_HOME_URL;
        if (loginRes.data.type === "teacher") redirectUrl = process.env.GATSBY_TEACH_URL;
        else if (loginRes.data.type === "student") redirectUrl = process.env.GATSBY_STUDENT_URL;
        navigate(redirectUrl ?? "");
      } catch (e) {
        setFieldError("code", t.translate("components.login.code_login.invalid_code") as string);
      }
      setLoginLoading(false);
    },
  });
  const enableResend = countDown === 0;
  const countDownStr = `(${countDown}s)`;
  return (
    <div style={{ textAlign: "center", width: "100%", height: "100%" }}>
      <div style={{ marginBottom: "12px" }}>
        <HeadlineText as="h1" style={{ marginBottom: "18px" }}>
          {t.translate("components.login.code_login.enter_code")}
        </HeadlineText>
        <LabelText>{headerText ?? t.translate("components.login.code_login.code_sent_to", { email })}</LabelText>
      </div>
      <form
        style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%" }}
        onSubmit={form.handleSubmit}
      >
        <div>
          <Input
            rounded
            data-name="loginEmailInput"
            autoFocus
            autoComplete="off"
            id="code"
            name="code"
            type="text"
            placeholder={t.translate("components.login.code_login.code_placeholder") as string}
            value={form.values.code}
            error={!!form.errors.code && form.touched.code}
            aria-invalid={!!form.errors.code && form.touched.code}
            aria-label={t.translate("components.login.code_login.aria_code_input") as string}
            onChange={(e) => {
              const val = e.target.value;
              if (val.length > 6) {
                return;
              }
              if (val.length > 0 && !Number.isInteger(parseInt(val))) {
                return;
              }
              form.handleChange(e);
            }}
          />
          <div
            style={{
              // set for transition to work when expanding/shrinking
              maxHeight: form.errors.code && form.touched.code ? "14px" : "0px",
              minHeight: form.errors.code ? "14px" : "0px",
              transition: "0.2s",
              fontSize: "14px",
              marginTop: "6px",
              marginBottom: "6px",
              marginLeft: "8px",
              textAlign: "start",
            }}
          >
            {form.errors.code}
          </div>
        </div>
        <Button data-name="verify-code-button" kind="primary" width="100%" type="submit" disabled={loginLoading}>
          {t.translate("components.login.code_login.verify_button")}
        </Button>
        <div style={{ display: "flex", alignSelf: "center" }}>
          <Button
            data-name="resend-code-button"
            kind="tertiary"
            size="s"
            disabled={!enableResend}
            onClick={async () => {
              if (enableResend) {
                sendOneTimeCode({ email });
                setCountDown(30);
              }
            }}
            style={{
              minWidth: "125px",
            }}
          >
            {`${t.translate("components.login.code_login.resend_code")} ${countDown > 0 ? countDownStr : ""}`}
          </Button>
          {changeEmail && (
            <Button data-name="verify-code-change-email" kind="tertiary" size="s" onClick={changeEmail}>
              {t.translate("components.login.code_login.change_email")}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}

export default CodeVerification;
