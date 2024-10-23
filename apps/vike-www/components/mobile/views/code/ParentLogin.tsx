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
import {
  checkAlreadyLoggedinParent,
  getDefaultApiEndpoint,
  UNKNOWN_SRC,
} from "@src/components/mobile/views/code/utils";
import useMetric from "@src/utils/useMetric";
import { AppDataContext } from "@src/components/AppDataContext";
import { logEvent } from "@src/utils/logClient";

type ParentLoginForm = { emailAddress: string; password: string };
const ParentLogin = withLocation(({ code, src }: { code: string; src: string }) => {
  useMetric("lite.codes.parent_login_visit");

  const [error, setError] = useState(null);

  const t = useContext(TranslationContext);
  const data = useContext(MobileDataContext);
  const {
    data: { geolocation },
  } = useContext(AppDataContext);
  const shortSession = geolocation?.state === "ny";
  useEffect(() => {
    logEvent({
      eventName: "web.external_page.login.detected_state",
      eventValue: geolocation && geolocation.state,
    });
  }, []);

  useEffect(() => {
    checkAlreadyLoggedinParent(data.data, code);
  }, [code, data]);

  const formik = useFormik<ParentLoginForm>({
    initialValues: {
      emailAddress: "",
      password: "",
    },
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(false);
      axios
        .post(`${getDefaultApiEndpoint()}/api/session${shortSession ? "?duration=short" : ""}`, {
          login: values.emailAddress,
          password: values.password,
        })
        .then((result) => {
          data.set({ user: result.data });
          navigate(`/sc/${code}/parentConnect?src=${src || UNKNOWN_SRC}`);
        })
        .catch((err) => {
          if (err.response.status === 403) {
            navigate(`/sc/${code}/oops?error=loggedInAsTeacher`);
          }
          setError(err.response.data.error.detail);
        });
    },
    validate: (values) => {
      const errors: FormikErrors<ParentLoginForm> = {};
      if (!values.emailAddress || values.emailAddress.length < 3 || values.emailAddress.indexOf("@") === -1) {
        errors.emailAddress = "length";
      }
      if (!values.password || values.password.length < 1) {
        errors.password = "length";
      }
      return errors;
    },
  });

  return (
    <Container>
      <Flex textAlign="center" flexDirection="column" alignItems="center">
        <Text fontWeight={600} margin="16px">
          {t.translate("codes.parent_login.title")}
        </Text>

        <Text mx="8px">
          {t.translate("codes.parent_signup.dont_have_account")}{" "}
          <Link to={`/ccs/${code}/signup/parent?${new URLSearchParams({ src: src || UNKNOWN_SRC }).toString()}`}>
            {t.translate("codes.parent_signup.sign_in_now")}
          </Link>
        </Text>

        <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
          <Input
            name="emailAddress"
            type="email"
            aria-label={t.translate("codes.parent_login.email_placeholder") as string}
            placeholder={t.translate("codes.parent_login.email_placeholder") as string}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            onChange={formik.handleChange}
            value={formik.values.emailAddress}
            success={formik.dirty && !formik.errors.emailAddress && formik.touched.emailAddress}
            error={formik.dirty && !!formik.errors.emailAddress && formik.touched.emailAddress}
            onBlur={formik.handleBlur}
          />

          {formik.dirty && formik.errors.emailAddress && formik.touched.emailAddress && (
            <ErrorBox>
              <Translate path="codes.parent_login.email_warning" />
            </ErrorBox>
          )}

          <Input
            name="password"
            type="password"
            aria-label={t.translate("codes.parent_login.password_placeholder") as string}
            placeholder={t.translate("codes.parent_login.password_placeholder") as string}
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
              <Translate path="codes.parent_login.password_warning" />
            </ErrorBox>
          )}

          {error && <ErrorBox>{error}</ErrorBox>}

          <Box mt="10px">
            <Button type="submit" disabled={formik.isSubmitting || !formik.isValid || !formik.dirty}>
              <Translate path="codes.parent_login.log_in" />
            </Button>
          </Box>
        </form>
      </Flex>
    </Container>
  );
});

export default ParentLogin;
