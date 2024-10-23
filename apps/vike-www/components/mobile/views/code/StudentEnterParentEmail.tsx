import withLocation from "@src/components/withLocation";
import React, { useContext } from "react";
import Translate from "@src/components/translation/Translate";
import Container from "@src/components/mobile/Container";
import _get from "lodash/get";
import { Flex } from "@src/components/Boxes";
import Input from "@src/components/forms/Input";
import Button from "@src/components/Button";
import { Text } from "@src/components/Text";
import { TranslationContext } from "@src/components/translation/TranslationContext";
import { FormikErrors, useFormik } from "formik";
import axios from "axios";
import { navigate } from "gatsby";
import { getDefaultApiEndpoint } from "@src/components/mobile/views/code/utils";
import { MobileDataContext } from "@src/components/mobile/MobileDataContext";
import navToError from "@src/utils/navToError";

type StudentEnterParentEmailForm = { email: string };
const StudentEnterParentEmail = withLocation(({ code }: { code: string }) => {
  const t = useContext(TranslationContext);
  const data = useContext(MobileDataContext);
  const formik = useFormik<StudentEnterParentEmailForm>({
    initialValues: {
      email: "",
    },
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(false);
      //TODO guess locale?
      axios
        .post(`${getDefaultApiEndpoint()}/api/pstudent/${_get(data, "data.user._id")}/addParent`, {
          email: values.email,
          locale: "en",
        })
        .then(() => {
          navigate(`/ccs/${code}/app/student`);
        })
        .catch(navToError);
    },
    validate: (values) => {
      const errors: FormikErrors<StudentEnterParentEmailForm> = {};
      if (!values.email || values.email.length < 3 || values.email.indexOf("@") === -1) {
        errors.email = "length";
      }
      return errors;
    },
  });

  return (
    <Container>
      <Flex textAlign="center" alignItems="center" flexDirection="column">
        <Text fontWeight={600} mt="10px">
          <Translate path="codes.student_enter_parent_email.title" />
        </Text>
        <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
          <Input
            name={"email"}
            type="email"
            aria-label={t.translate("codes.student_enter_parent_email.email_placeholder") as string}
            placeholder={t.translate("codes.student_enter_parent_email.email_placeholder") as string}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            onChange={formik.handleChange}
            value={formik.values.email}
            success={formik.isValid && formik.touched.email}
            error={!formik.isValid && formik.touched.email}
            onBlur={formik.handleBlur}
          />
          <Button type="submit" my="15px" disabled={formik.isSubmitting || !formik.isValid || !formik.dirty}>
            {t.translate("codes.student_enter_parent_email.submit")}
          </Button>
        </form>
      </Flex>
    </Container>
  );
});

export default StudentEnterParentEmail;
