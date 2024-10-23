import React, { useContext, useEffect } from "react";
import CommonModal, { ModalHeader } from "./CommonModal";
import Input from "@src/components/forms/Input";
import { MutedText, Text } from "@src/components/Text";
import { ModalContext, ModalType } from "@src/components/modals/ModalController";
import styled from "@emotion/styled";
import { layout } from "styled-system";
import Button from "@src/components/Button";
import { css } from "@emotion/react";
import { Box, Flex } from "@src/components/Boxes";
import { FormikErrors, useFormik } from "formik";
import { TranslationContext } from "@src/components/translation/TranslationContext";
import { logEvent } from "@src/utils/logClient";
import window from "global/window";
import { useFeatureFlagsWithOverrides } from "@src/utils/useFeatureFlag";
import { CommonConnectionOptions } from "tls";

const Link = styled.a<{ display?: "inline-block" }>`
  font-family: proxima-nova, "Helvetica Neue", Helvetica, Arial, sans-serif;
  word-break: keep-all;
  white-space: nowrap;
  font-weight: 600;
  color: #00bcf2;

  text-decoration: none;
  cursor: pointer;
  &:hover,
  &:focus {
    text-decoration: none;
    color: #00a8d9;
  }

  ${layout}
`;

// `code` this will already be uppercase when passed in here
function fixCode(code: string) {
  switch (code[0]) {
    case "M":
    case "E":
    case "B":
      return `S${code.slice(1)}`;
    default:
      return code;
  }
}

const ParentSignupModal = (props: CommonConnectionOptions) => {
  const modalContext = useContext(ModalContext);
  const featureFlags = useFeatureFlagsWithOverrides();
  const t = useContext(TranslationContext);

  useEffect(() => {
    logEvent("externalPage.parent.signup_modal.shown");
  }, []);

  function showWhatIsACode() {
    modalContext.showModal(ModalType.WhatIsACode);
  }

  type CodeType = { code: string };
  const formik = useFormik<CodeType>({
    initialValues: {
      code: "",
    },
    onSubmit: (values) => {
      logEvent({ eventName: "externalPage.parent.signup.click", metadata: featureFlags });
      const baseUrl = process.env.GATSBY_PARENT_CODE_URL;
      const code = values.code.toUpperCase();
      if (values.code[0] === "C") {
        window.location.href = `${baseUrl}/ccs/${code}?src=external_banner`;
      } else {
        //  'sc' endpoint accepts both parent and student codes
        window.location.href = `${baseUrl}/sc/${fixCode(code)}?src=external_banner`;
      }
    },
    validate: (values: CodeType) => {
      const errors: FormikErrors<CodeType> = {};
      if (!values.code || values.code.length < 7 || values.code.length > 9) {
        errors.code = "length";
      }
      return errors;
    },
  });

  const logClick = (kind: string) => {
    logEvent({
      eventName: `externalPage.parent.signup.${kind}_button.click`,
      metadata: featureFlags,
    });
  };
  return (
    <CommonModal
      headerText={t.translate("layouts.main.parents")}
      {...props}
      modalDialogStyle={css`
        padding: 30px 0 0;
      `}
    >
      <div style={{ width: "100%" }} data-test-name="parent-signup-modal">
        <Box px="30px" width={"100%"}>
          <Flex alignSelf="start" alignItems="baseline">
            <Text display="inline-block" fontSize={16} mr="5px">
              {t.translate("parent_code.enter_your_code")}
            </Text>
            <Link onClick={showWhatIsACode} display="inline-block">
              {t.translate("code_explanation.title")}
            </Link>
          </Flex>
          <form onSubmit={formik.handleSubmit}>
            <Input
              name="code"
              onChange={formik.handleChange}
              value={formik.values.code}
              success={formik.isValid && formik.touched.code}
              error={!formik.isValid && formik.touched.code}
              onBlur={formik.handleBlur}
              aria-label={t.translate("parent_code.code_placeholder") as string}
              placeholder={t.translate("parent_code.code_placeholder") as string}
              marginBottom={15}
            />
            <Button
              big
              square
              disabled={formik.isSubmitting || !formik.isValid || !formik.dirty}
              type="submit"
              width="100%"
              my="5px"
            >
              Check code
            </Button>
          </form>
        </Box>
        <Box backgroundColor="#eee" pt={3} pb={4} mt={3} width={"100%"}>
          <ModalHeader>Don't have a code?</ModalHeader>
          <Flex flexDirection={["row"]} alignItems="center" justifyContent="center">
            <Button as="a" big signup onClick={() => logClick("login")} href="https://home.classdojo.com">
              {t.translate("pages.home.log_in")}
            </Button>
            <MutedText mx={3}>OR</MutedText>
            <Button
              as="a"
              big
              onClick={() => logClick("signup")}
              href="https://home.classdojo.com/#/signup"
              data-test-name="parent-signup-button"
            >
              {t.translate("pages.home.sign_up")}
            </Button>
          </Flex>
        </Box>
      </div>
    </CommonModal>
  );
};

export default ParentSignupModal;
