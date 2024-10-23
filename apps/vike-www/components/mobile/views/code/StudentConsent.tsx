import withLocation from "@src/components/withLocation";
import React, { useContext } from "react";
import { TranslationContext } from "@src/components/translation/TranslationContext";
import { FormikErrors, useFormik } from "formik";
import { navigate } from "gatsby";
import Container from "@src/components/mobile/Container";
import { Box, Flex } from "@src/components/Boxes";
import { Text } from "@src/components/Text";
import Input from "@src/components/forms/Input";
import Button from "@src/components/Button";
import ErrorBox from "@src/components/mobile/ErrorBox";
import Translate from "@src/components/translation/Translate";
import { MobileLinkGatsby } from "@src/components/mobile/Link";
import { MobileDataContext } from "@src/components/mobile/MobileDataContext";
import axios from "axios";
import { getDefaultApiEndpoint } from "@src/components/mobile/views/code/utils";
import navToError from "@src/utils/navToError";
import useMetric from "@src/utils/useMetric";

type StudentConsentForm = { email: string };
const StudentConsent = withLocation(({ code }: { code: string }) => {
  useMetric("lite.codes.student_consent_visit");

  const t = useContext(TranslationContext);
  const data = useContext(MobileDataContext);

  const formik = useFormik<StudentConsentForm>({
    initialValues: {
      email: "",
    },
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(false);
      //TODO guess locale?
      axios
        .post(`${getDefaultApiEndpoint()}/api/pstudent/${data.data.user?._id}/addParent`, {
          email: values.email,
          locale: "en",
        })
        .then(() => {
          navigate(`/sc/${code}/studentDone`);
        })
        .catch(navToError);
    },
    validate: (values) => {
      const errors: FormikErrors<StudentConsentForm> = {};
      if (!values.email || values.email.length < 3 || values.email.indexOf("@") === -1) {
        errors.email = "length";
      }
      return errors;
    },
  });

  return (
    <Container>
      <Flex textAlign="center" alignItems="center" flexDirection="column">
        <Text mt="10px">{t.translate("codes.student_consent.need_consent")}</Text>
        <form onSubmit={formik.handleSubmit} style={{ width: "90%" }}>
          <Input
            type="email"
            name={"email"}
            aria-label={t.translate("codes.student_consent.parent_email_placeholder") as string}
            placeholder={t.translate("codes.student_consent.parent_email_placeholder") as string}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            onChange={formik.handleChange}
            value={formik.values.email}
            success={formik.isValid && formik.touched.email}
            error={!formik.isValid && formik.touched.email}
            onBlur={formik.handleBlur}
          />

          {formik.dirty && formik.errors.email && formik.touched.email && (
            <ErrorBox>
              <Translate path="codes.student_consent.parent_email_warning" />
            </ErrorBox>
          )}

          <Button type="submit" mt="15px" disabled={formik.isSubmitting || !formik.isValid || !formik.dirty}>
            {t.translate("codes.student_consent.send")}
          </Button>
        </form>

        <Box mb="20px">
          <MobileLinkGatsby to={`/sc/${code}/studentDone`}>
            {t.translate("codes.student_consent.dont_know_email")}
          </MobileLinkGatsby>
        </Box>
      </Flex>
    </Container>
  );
});

export default StudentConsent;
