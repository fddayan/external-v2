import withLocation from "@src/components/withLocation";
import React, { useContext, useState } from "react";
import { Link, navigate } from "gatsby";
import _range from "lodash/range";
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
import Select from "@src/components/forms/Select";
import { getDefaultApiEndpoint } from "@src/components/mobile/views/code/utils";
import useMetric from "@src/utils/useMetric";

type StudentSignupForm = { username: string; password: string; age: number };
const StudentSignup = withLocation(({ code }: { code: string }) => {
  useMetric("lite.codes.student_signup_visit");

  const [error, setError] = useState(null);

  const t = useContext(TranslationContext);
  const data = useContext(MobileDataContext);
  const formik = useFormik<StudentSignupForm>({
    initialValues: {
      username: "",
      password: "",
      age: 0,
    },
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(false);
      try {
        await axios.post(`${getDefaultApiEndpoint()}/api/studentUser`, {
          username: values.username,
          password: values.password,
          age: Number(values.age) || 0,
          code: code,
        });
        const login = await axios.post(`${getDefaultApiEndpoint()}/api/session`, {
          login: values.username,
          password: values.password,
        });

        data.set({ user: login.data });
        navigate(`sc/${code}/studentConnect`);
      } catch (err: any) {
        setError(err?.response?.data?.error?.detail);
      }
    },
    validate: (values) => {
      const errors: FormikErrors<StudentSignupForm> = {};
      if (!values.username || values.username.length < 1) {
        errors.username = "length";
      }
      if (!values.password || values.password.length < 8) {
        errors.password = "length";
      }
      if (!values.age || values.age === 0) {
        errors.age = "not selected";
      }
      return errors;
    },
  });

  return (
    <Container>
      <Flex textAlign="center" flexDirection="column" alignItems="center">
        <Text fontWeight={600} margin="16px">
          {t.translate("codes.student_signup.title")}
        </Text>

        <Text margin="12px">
          {t.translate("codes.student_signup.already_have_account")}{" "}
          <Link to={`/sc/${code}/studentLogin`}>{t.translate("codes.student_signup.log_in")}</Link>
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
            success={formik.dirty && !formik.errors.username && formik.touched.username}
            error={formik.dirty && !!formik.errors.username && formik.touched.username}
            onBlur={formik.handleBlur}
          />

          {formik.dirty && formik.errors.username && formik.touched.username && (
            <ErrorBox>
              Your username can only have letters and numbers, and it needs to be different that everyone else's. Try
              adding some numbers, your favorite color, or your favorite shape to make it unique!
            </ErrorBox>
          )}

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
            success={formik.dirty && !formik.errors.password && formik.touched.password}
            error={formik.dirty && !!formik.errors.password && formik.touched.password}
            onBlur={formik.handleBlur}
            mt="10px"
          />

          {formik.dirty && formik.errors.password && formik.touched.password && (
            <ErrorBox>Your password needs to be at least 8 characters long!</ErrorBox>
          )}

          <Select
            marginBottom={15}
            name="age"
            mt="10px"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.age}
            aria-label={t.translate("codes.student_signup.age_placeholder") as string}
          >
            <option value={0} disabled>
              {t.translate("codes.student_signup.age_placeholder")}
            </option>
            {_range(1, 18).map((age) => (
              <option value={age} key={age}>
                {age}
              </option>
            ))}
            <option value={18}>{t.translate("codes.student_signup.18_or_over")}</option>
          </Select>

          {formik.dirty && formik.errors.age && formik.touched.age && <ErrorBox>You must select your age!</ErrorBox>}

          {error && <ErrorBox>{error}</ErrorBox>}

          <Box mt="10px">
            <Button type="submit" disabled={formik.isSubmitting || !formik.isValid || !formik.dirty}>
              {t.translate("codes.student_signup.sign_up")}
            </Button>
          </Box>
        </form>
        <Text margin="16px">{t.translate("codes.student_signup.terms")}</Text>
      </Flex>
    </Container>
  );
});

export default StudentSignup;
