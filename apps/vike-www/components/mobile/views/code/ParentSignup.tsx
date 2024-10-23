import withLocation from "@src/components/withLocation";
import React, { useContext, useEffect, useState } from "react";
import { Link, navigate } from "gatsby";
import Container from "@src/components/mobile/Container";
import { Box, Flex } from "@src/components/Boxes";
import { Text } from "@src/components/Text";
import { TranslationContext } from "@src/components/translation/TranslationContext";
import Button from "@src/components/Button";
import Input from "@src/components/forms/Input";
import { FormikErrors, useFormik } from "formik";
import ErrorBox from "@src/components/mobile/ErrorBox";
import axios from "axios";
import { MobileDataContext } from "@src/components/mobile/MobileDataContext";
import Translate from "@src/components/translation/Translate";
import MobileLink from "@src/components/mobile/Link";
import { checkAlreadyLoggedinParent, getDefaultApiEndpoint } from "@src/components/mobile/views/code/utils";
import useMetric from "@src/utils/useMetric";
import { AppDataContext } from "@src/components/AppDataContext";
import { logEvent } from "@src/utils/logClient";

type ParentSignupForm = { firstName: string; lastName: string; emailAddress: string; password: string };
const ParentSignup = withLocation(({ code, src }: { code: string; src: string }) => {
  useMetric("lite.codes.parent_signup_visit");

  const [error, setError] = useState(null);
  const data = useContext(MobileDataContext);
  const t = useContext(TranslationContext);
  const {
    data: { geolocation },
  } = useContext(AppDataContext);
  const shortSession = geolocation?.state === "ny";

  useEffect(() => {
    checkAlreadyLoggedinParent(data.data, code);
  }, [code, data]);

  useEffect(() => {
    logEvent({
      eventName: "web.external_page.login.detected_state",
      eventValue: geolocation && geolocation.state,
    });
  }, []);

  const formik = useFormik<ParentSignupForm>({
    initialValues: {
      firstName: "",
      lastName: "",
      emailAddress: "",
      password: "",
    },
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(false);
      try {
        const body = Object.assign({}, values, code && code[0] != "C" ? { invitationId: code } : {});

        await axios.post(`${getDefaultApiEndpoint()}/api/parent`, body);
        const login = await axios.post(
          `${getDefaultApiEndpoint()}/api/session${shortSession ? "?duration=short" : ""}`,
          {
            login: values.emailAddress,
            password: values.password,
          },
        );

        data.set({ user: login.data });
        navigate(`/sc/${code}/parentDone?src=${src || "digitalSignupLink"}`);
      } catch (err: any) {
        setError(err.response?.data?.error?.detail);
      }
    },
    validate: (values) => {
      const errors: FormikErrors<ParentSignupForm> = {};
      if (!values.firstName || values.firstName.length < 1) {
        errors.firstName = "length";
      }
      if (!values.lastName || values.lastName.length < 1) {
        errors.lastName = "length";
      }
      if (!values.emailAddress || values.emailAddress.length < 3 || values.emailAddress.indexOf("@") === -1) {
        errors.emailAddress = "length";
      }
      if (!values.password || values.password.length < 8) {
        errors.password = "length";
      }
      return errors;
    },
  });

  return (
    <Container>
      <Flex textAlign="center" flexDirection="column" alignItems="center">
        <Text fontWeight={600} margin="16px">
          {t.translate("codes.parent_signup.title")}
        </Text>

        <Text margin="12px">
          {t.translate("codes.parent_signup.already_have_account")}{" "}
          <Link to={`/sc/${code}/parentLogin?src=${src}`}>{t.translate("codes.parent_signup.log_in")}</Link>
        </Text>

        <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
          <Input
            name="firstName"
            aria-label={t.translate("codes.parent_signup.first_name_placeholder") as string}
            placeholder={t.translate("codes.parent_signup.first_name_placeholder") as string}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            onChange={formik.handleChange}
            value={formik.values.firstName}
            success={formik.dirty && !formik.errors.firstName && formik.touched.firstName}
            error={formik.dirty && !!formik.errors.firstName && formik.touched.firstName}
            onBlur={formik.handleBlur}
          />

          {formik.dirty && formik.errors.firstName && formik.touched.firstName && (
            <ErrorBox>
              <Translate path="codes.parent_signup.first_name_warning" />
            </ErrorBox>
          )}

          <Input
            name="lastName"
            aria-label={t.translate("codes.parent_signup.last_name_placeholder") as string}
            placeholder={t.translate("codes.parent_signup.last_name_placeholder") as string}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            onChange={formik.handleChange}
            value={formik.values.lastName}
            success={formik.dirty && !formik.errors.lastName && formik.touched.lastName}
            error={formik.dirty && !!formik.errors.lastName && formik.touched.lastName}
            onBlur={formik.handleBlur}
            mt="10px"
          />

          {formik.dirty && formik.errors.lastName && formik.touched.lastName && (
            <ErrorBox>
              <Translate path="codes.parent_signup.last_name_warning" />
            </ErrorBox>
          )}

          <Input
            name="emailAddress"
            type="email"
            aria-label={t.translate("codes.parent_signup.email_placeholder") as string}
            placeholder={t.translate("codes.parent_signup.email_placeholder") as string}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            onChange={formik.handleChange}
            value={formik.values.emailAddress}
            success={formik.dirty && !formik.errors.emailAddress && formik.touched.emailAddress}
            error={formik.dirty && !!formik.errors.emailAddress && formik.touched.emailAddress}
            onBlur={formik.handleBlur}
            mt="10px"
          />

          {formik.dirty && formik.errors.emailAddress && formik.touched.emailAddress && (
            <ErrorBox>
              <Translate path="codes.parent_signup.email_warning" />
            </ErrorBox>
          )}

          <Input
            name="password"
            type="password"
            aria-label={t.translate("codes.parent_signup.password_placeholder") as string}
            placeholder={t.translate("codes.parent_signup.password_placeholder") as string}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            onChange={formik.handleChange}
            value={formik.values.password}
            success={formik.dirty && !formik.errors.password && formik.touched.password}
            error={formik.dirty && !!formik.errors.password && formik.touched.password}
            onBlur={formik.handleBlur}
            mt="10px"
          />

          {formik.dirty && formik.errors.password && formik.touched.password && (
            <ErrorBox>
              <Translate path="codes.parent_signup.password_warning" />
            </ErrorBox>
          )}

          {error && (
            <ErrorBox>
              {/Email already exists/.test(error || "") ? (
                <Link to={`/sc/${code}/parentLogin`}>{t.translate("codes.parent_signup.email_taken_error")}</Link>
              ) : (
                t.translate("codes.parent_signup.error")
              )}
            </ErrorBox>
          )}

          <Box mt="10px">
            <Button type="submit" disabled={formik.isSubmitting || !formik.isValid || !formik.dirty}>
              {t.translate("codes.parent_signup.sign_up")}
            </Button>
          </Box>
        </form>

        <Text marginBottom="10px">
          <MobileLink href="https://home.classdojo.com/#/forgot">
            {t.translate("codes.parent_signup.forgot_password")}
          </MobileLink>
        </Text>

        <Text margin="16px" color="#aaa">
          {t.translate("codes.parent_signup.terms")}
        </Text>
      </Flex>
    </Container>
  );
});

export default ParentSignup;
