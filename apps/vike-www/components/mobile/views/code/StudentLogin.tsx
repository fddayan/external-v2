import withLocation from "@src/components/withLocation";
import React, { useContext, useState } from "react";
import { navigate } from "gatsby";
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
import { getDefaultApiEndpoint } from "@src/components/mobile/views/code/utils";
import useMetric from "@src/utils/useMetric";

type StudentLoginForm = { username: string; password: string };
const StudentLogin = withLocation(({ code }: { code: string }) => {
  useMetric("lite.codes.student_login_visit");

  const [error, setError] = useState(null);

  const t = useContext(TranslationContext);
  const data = useContext(MobileDataContext);
  const formik = useFormik<StudentLoginForm>({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(false);
      axios
        .post(`${getDefaultApiEndpoint()}/api/session`, {
          login: values.username,
          password: values.password,
        })
        .then((result) => {
          data.set({ user: result.data });
          navigate(`sc/${code}/studentConnect`);
        })
        .catch((err) => {
          setError(err.response.data.error.detail);
        });
    },
    validate: (values) => {
      const errors: FormikErrors<StudentLoginForm> = {};
      if (!values.username || values.username.length < 1) {
        errors.username = "length";
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
          {t.translate("codes.student_login.title")}
        </Text>

        <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
          <Input
            name="username"
            aria-label={t.translate("codes.student_login.username_placeholder") as string}
            placeholder={t.translate("codes.student_login.username_placeholder") as string}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            onChange={formik.handleChange}
            value={formik.values.username}
            success={formik.isValid && formik.touched.username}
            error={!formik.isValid && formik.touched.username}
            onBlur={formik.handleBlur}
          />

          <Input
            name="password"
            type="password"
            aria-label={t.translate("codes.student_login.password_placeholder") as string}
            placeholder={t.translate("codes.student_login.password_placeholder") as string}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            onChange={formik.handleChange}
            value={formik.values.password}
            success={formik.isValid && formik.touched.password}
            error={!formik.isValid && formik.touched.password}
            onBlur={formik.handleBlur}
            mt="10px"
          />

          {error && <ErrorBox>{error}</ErrorBox>}

          <Box mt="10px">
            <Button type="submit" disabled={formik.isSubmitting || !formik.isValid || !formik.dirty}>
              Log in
            </Button>
          </Box>
        </form>
        <Text margin="16px">{t.translate("codes.student_login.forgot")}</Text>
      </Flex>
    </Container>
  );
});

export default StudentLogin;
