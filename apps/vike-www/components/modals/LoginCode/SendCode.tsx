import React, { useContext, useEffect } from "react";
import { useFormik } from "formik";
import Button from "@src/components/Button";
import Input from "../../forms/Input";
import { ModalTitle } from "../../nessie-web";
import { sendOneTimeCode } from "@src/utils/requests/alternativeAccessMethods";
import { TranslationContext } from "@src/components/translation/TranslationContext";

function SendCode({
  onCodeSend,
  setEmailUpdated,
  sentEmail,
  initialEmail,
}: {
  onCodeSend: ({ email }: { email: string }) => void;
  setEmailUpdated: (email: string) => void;
  sentEmail: string;
  initialEmail?: string;
}) {
  const t = useContext(TranslationContext);

  const form = useFormik({
    initialValues: { email: sentEmail || initialEmail },
    validate: (values) => {
      const emailRe = /^(?=\S{3,128}$)[^\s\\;,:]+@[^\s\\;,:.]{1}[^\s\\;,:]*\.[^\s\\;,:0-9]+$/;
      if (!values.email) {
        return { email: t.translate("components.login.code_login.required") };
      } else if (!emailRe.test(values.email)) {
        return { email: t.translate("components.login.code_login.invalid_email") };
      }
      return {};
    },
    validateOnChange: false,
    onSubmit: async ({ email }, { validateForm, setFieldError }) => {
      const errors = await validateForm({ email });
      if (errors.email) {
        return;
      }

      const codeRes = await sendOneTimeCode({ email });
      if (codeRes instanceof Error) {
        setFieldError("email", t.translate("components.login.code_login.email_doublecheck") as string);
        return;
      }
      onCodeSend({ email });
    },
  });

  useEffect(() => {
    setEmailUpdated(form.values.email);
  }, [form.values.email, setEmailUpdated]);

  return (
    <form onSubmit={form.handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%" }}>
      <ModalTitle>{t.translate("components.login.code_login.login_without_password")}</ModalTitle>
      <div>
        <Input
          rounded
          value={form.values.email}
          autoFocus
          onChange={form.handleChange}
          onFocus={() => form.setErrors({ email: "" })}
          id="email"
          name="email"
          type="text"
          placeholder="Email"
          error={!!form.errors.email && form.touched.email}
          aria-invalid={!!form.errors.email && form.touched.email}
        />
        <div
          style={{
            // set for transition to work when expanding/shrinking
            maxHeight: form.errors.email && form.touched.email ? "14px" : "0px",
            minHeight: form.errors.email ? "14px" : "0px",
            transition: "0.2s",
            fontSize: "14px",
            marginBottom: "6px",
            marginTop: "6px",
            marginLeft: "8px",
          }}
        >
          {form.errors.email}
        </div>
      </div>
      <Button type="submit" style={{ width: "100%", minHeight: "50px" }} size="l">
        {t.translate("components.login.code_login.submit")}
      </Button>
    </form>
  );
}

export default SendCode;
