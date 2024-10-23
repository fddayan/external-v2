import React, { useContext, useEffect, useState } from "react";
import { Text } from "@src/components/Text";
import CommonModal, { CommonModalProps } from "./CommonModal";
import Input from "@src/components/forms/Input";
import Button from "@src/components/Button";
import { Box } from "@src/components/Boxes";
import { TranslationContext } from "@src/components/translation/TranslationContext";
import Translate from "@src/components/translation/Translate";
import { FormikErrors, useFormik } from "formik";
import { css } from "@emotion/react";
import loadingMojo from "@src/assets/images/loadingMojo.gif";
import Axios from "axios";
import { logEvent } from "@src/utils/logClient";
import { ModalContext } from "./ModalController";

type ApiAnswerState = "success" | "error" | null;

const ApiAnswerDetails = ({ apiAnswer }: { apiAnswer: ApiAnswerState }) => {
  if (apiAnswer === null) return null;

  const colorCss =
    apiAnswer === "success"
      ? css`
          background-color: #dff0d8;
          border-color: #d6e9c6;
          color: #3c763d;
          border-radius: 5px;
        `
      : css`
          background-color: #f2dede;
          border-color: #ebccd1;
          color: #a94442;
          border-radius: 5px;
        `;
  return (
    <Box my={3} p={3} textAlign="center" css={colorCss}>
      <Text fontSize="2" textAlign="center">
        {apiAnswer === "success" && <Translate path="components.forgot.please_check" />}
        {apiAnswer === "error" && <Translate path="components.forgot.no_email_exists" />}
      </Text>
    </Box>
  );
};

type ResetPasswordForm = {
  emailAddress: string;
};
const ResetPasswordModal = (props: CommonModalProps) => {
  const t = useContext(TranslationContext);
  const [apiAnswer, setApiAnswer] = useState<ApiAnswerState>(null);
  const { props: modalContextProps } = useContext(ModalContext);
  const _userType = modalContextProps.userType;
  const previousEmail = modalContextProps.previousEmail;

  const userType = _userType === "leader" ? "school_leader" : _userType;

  useEffect(() => {
    logEvent({
      eventName: "web.account_recovery.forgot_password.screen_view",
      metadata: {
        account_type: userType,
        current_site: "external",
        ref: "external",
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formik = useFormik<ResetPasswordForm>({
    initialValues: {
      emailAddress: previousEmail,
    },
    onSubmit: (values, { setSubmitting }) => {
      logEvent({
        eventName: "web.account_recovery.forgot_password.reset_password_tap",
        metadata: {
          account_type: userType,
          current_site: "external",
        },
      });
      const PW_RESET = "//www.classdojo.com/api/passwordReset";
      Axios.post(PW_RESET, values)
        .then(() => {
          logEvent({
            eventName: "web.account_recovery.forgot_password.reset_password_success",
            metadata: {
              account_type: userType,
              current_site: "external",
            },
          });
          setApiAnswer("success");
        })
        .catch(() => {
          logEvent({
            eventName: "web.account_recovery.forgot_password.reset_password_failure",
            metadata: {
              account_type: userType,
              current_site: "external",
            },
          });
          setApiAnswer("error");
        })
        .finally(() => setSubmitting(false));
    },
    validate: (values: ResetPasswordForm) => {
      const errors: FormikErrors<ResetPasswordForm> = {};
      if (!values.emailAddress || values.emailAddress.length === 0) {
        errors.emailAddress = "length";
      }
      return errors;
    },
  });

  return (
    <CommonModal headerText={t.translate("components.forgot.reset_password")} {...props}>
      <Box mx="auto" maxWidth="80%" mt="5px">
        {formik.isSubmitting && (
          <Box width="50px" height="50px" mb={4} mx="auto">
            <img alt="Loading mojo" src={loadingMojo}></img>
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <Text>{t.translate("components.forgot.if_student")}</Text>
          <Input
            name="emailAddress"
            aria-label={t.translate("components.common.username_or_email") as string}
            placeholder={t.translate("components.common.username_or_email") as string}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            onChange={formik.handleChange}
            value={formik.values.emailAddress}
            success={formik.isValid && formik.touched.emailAddress}
            error={!formik.isValid && formik.touched.emailAddress}
            onBlur={formik.handleBlur}
          />
          <Button type="submit" big my="15px" width="100%" disabled={formik.isSubmitting || !formik.isValid}>
            {t.translate("components.forgot.reset_password")}
          </Button>
          <ApiAnswerDetails apiAnswer={apiAnswer} />
        </form>
      </Box>
    </CommonModal>
  );
};

export default ResetPasswordModal;
