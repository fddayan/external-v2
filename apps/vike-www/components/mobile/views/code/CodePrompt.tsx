import React, { useContext, useEffect } from "react";
import { navigate } from "gatsby";
import Translate from "@src/components/translation/Translate";
import Container from "@src/components/mobile/Container";
import { Flex } from "@src/components/Boxes";
import Input from "@src/components/forms/Input";
import Button from "@src/components/Button";
import { Text } from "@src/components/Text";
import { TranslationContext, TranslationType } from "@src/components/translation/TranslationContext";
import { FormikErrors, useFormik } from "formik";
import useMetric from "@src/utils/useMetric";
import useSearchParams from "@src/utils/useSearchParams";

function getParams(t: (string: string, object?: Record<string, string>) => TranslationType, isIndividualCode: boolean) {
  if (isIndividualCode)
    return {
      action: "/sc/",
      instructions: <Translate path="codes.code_prompt.individual_code_instructions" />,
      placeholder: t("codes.code_prompt.individual_code_placeholder") as string,
      description: <Translate path="codes.code_prompt.individual_code_description" />,
    };

  return {
    action: "/cc/",
    instructions: <Translate path="codes.code_prompt.class_code_instructions" />,
    placeholder: t("codes.code_prompt.class_code_placeholder") as string,
    description: <Translate path="codes.code_prompt.class_code_description" />,
  };
}

// since we can't directly load lite.classdojo.com/sc/<CODE> since there is no file on S3 there,
// instead external site links to lite.classdojo.com/sc/?code=<CODE> which will land us here,
// then use Gatsby.navigate to send us to /sc/<CODE>. This component exists only for this purpose,
// and to avoid displaying the prompt when the code is present – showing the prompt then redirecting
// is a bad experience.
export default function CodeRedirector() {
  const [code] = useSearchParams("code");
  const isSSR = typeof window === "undefined";

  useEffect(() => {
    if (code) {
      navigate(`sc/${code}/`);
    }
  }, [code]);

  // don't render anything server side for this, so we don't see the prompt flash then redirect
  if (isSSR) return null;
  // if code exists, useEffect will navigate us away, so render nothing
  if (code != null) return null;
  // otherwise – no code and not server rendering – show the prompt
  return <CodePrompt isIndividualCode />;
}

type CodePromptForm = { code: string };
function CodePrompt({ isIndividualCode }: { isIndividualCode: boolean }) {
  useMetric("lite.codes.code_prompt");

  const t = useContext(TranslationContext);
  const { action, placeholder, description, instructions } = getParams(t.translate, isIndividualCode);
  const formik = useFormik<CodePromptForm>({
    initialValues: {
      code: "",
    },
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(false);
      navigate(action + values.code);
    },
    validate: (values) => {
      const errors: FormikErrors<CodePromptForm> = {};
      if (!values.code || values.code.length < 1) {
        errors.code = "length";
      }
      return errors;
    },
  });

  return (
    <Container>
      <Flex textAlign="center" alignItems="center" flexDirection="column">
        <Text mt="10px">
          <strong>{instructions}</strong>
        </Text>
        <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
          <Input
            autoFocus
            aria-label={placeholder}
            name={"code"}
            placeholder={placeholder}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            onChange={formik.handleChange}
            value={formik.values.code}
            success={formik.isValid && formik.touched.code}
            error={!formik.isValid && formik.touched.code}
            onBlur={formik.handleBlur}
          />
          <Button type="submit" my="15px" disabled={formik.isSubmitting || !formik.isValid || !formik.dirty}>
            {t.translate("codes.code_prompt.submit")}
          </Button>
        </form>

        <Text>{description}</Text>
      </Flex>
    </Container>
  );
}
