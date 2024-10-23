import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useLocation } from "@reach/router";
import Button from "@src/components/Button";
import { Text } from "@src/components/Text";
import Checkbox from "@src/components/forms/Checkbox";
import Input from "@src/components/forms/Input";
import Select from "@src/components/forms/Select";
import { FormErrors } from "@src/components/forms/helpers";
import { DetailText } from "@src/components/nessie-web";
import Translate from "@src/components/translation/Translate";
import { TranslationContext } from "@src/components/translation/TranslationContext";
import { useCreateConvertExperimentEvent, useStartExperiment } from "@src/utils/experiment";
import { ExternalSwitches } from "@src/utils/experiments/constants";
import { LocalStorageWrapper } from "@src/utils/localStorage";
import { incrementMetric, logEvent as le, setEntityId } from "@src/utils/logClient";
import query from "@src/utils/query";
import { currentLanguage, fixLocale, getRelativePath } from "@src/utils/routes";
import { useFeatureFlagsWithOverrides } from "@src/utils/useFeatureFlag";
import axios from "axios";
import cookies from "cookies-js";
import { Field, Formik } from "formik";
import window from "global/window";
import _ from "lodash";
import React, { useContext, useEffect, useState } from "react";
import posed, { Transition } from "react-pose";
import { color, layout, space } from "styled-system";
import { AppDataContext } from "../AppDataContext";
import { Box, Flex } from "../Boxes";
import { ModalContext, ModalType } from "./ModalController";

import { theme } from "@classdojo/web/nessie";
import loadingMojo from "@src/assets/images/loadingMojo.gif";
import { ActivationRedirectionContext } from "@src/contexts/ActivationRedirectionContext";
import MailCheck from "react-mailcheck";
import { getQueryParams, useQueryParamString } from "react-use-query-param-string";
import PasswordValidationMessage from "../forms/password/PasswordValidationMessage";
import { isValidNYCPassword } from "../forms/password/pwValidityHelpers";

axios.defaults.withCredentials = true;
type LinkProps = { hoverColor?: string; display?: "inline"; ml?: `${number}px` };
const Link = styled.a<LinkProps>`
  display: inline-block;
  line-height: 18px;
  font-family: proxima-nova, "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-weight: 600;
  color: ${(props) => (props.color ? props.color : "#adadad")};
  text-decoration: none;
  cursor: pointer;
  &:hover,
  &:focus {
    text-decoration: none;
    color: ${(props) => (props.hoverColor ? props.hoverColor : "#00bcf2")};
  }

  ${layout}
  ${space}
  ${color}
`;

const PrivacyLink = styled("a")`
  color: ${theme.colors.dt_aqua50};
`;

const InputInfo = styled("div")<{ display?: "inline-block" }>`
  text-align: left;
  font-weight: bold;
  color: rgb(0, 174, 239);
  padding-bottom: 1rem;
  padding-left: 1rem;
  padding-top: calc(1rem - 15px);

  ${layout}
`;

const InputError = styled(InputInfo)`
  color: #ee4431;
`;

const AnimatedInfoMessage = styled(
  posed.div({
    enter: { height: "auto" },
    exit: { height: 0 },
    transition: { default: { ease: "tween", duration: 1000 } },
  }),
)`
  overflow: hidden;
`;

const logEvent = function (eventName: string) {
  return le({
    eventName: eventName,
    eventValue: "domain_email_signup_overlay_variant",
  });
};

type ApiAnswerState =
  | "success"
  | "api-error"
  | "email-error"
  | "password-matches-email-error"
  | "common-password-error"
  | "email-exists-error"
  | null;

type AttributionAnswers =
  | "youtube"
  | "search"
  | "used_parent_student"
  | "recommended"
  | "tiktok"
  | "socialmedia"
  | "school_uses"
  | "dojo_ambassador"
  | "dojo_mentor"
  | "other"
  | "";

const ApiAnswerDetails = ({
  apiAnswer,
  showLoginModal,
  userType,
}: {
  apiAnswer: ApiAnswerState;
  showLoginModal: () => void;
  userType: string;
}) => {
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
      {apiAnswer === "success" && (
        <Text fontSize="2">
          <Translate path="components.signup_teacher.success" />
          <br />
          <Translate path="components.common.redirect_now" />
        </Text>
      )}
      {apiAnswer === "api-error" && (
        <>
          <Text fontSize="2" display="inline">
            <Translate path="components.signup_teacher.unknown_error" />
          </Text>
        </>
      )}
      {apiAnswer === "email-exists-error" && (
        <>
          <Text fontSize="2" display="inline">
            <Translate path="components.signup_teacher.already_used" />
          </Text>
          <Link
            ml="5px"
            onClick={() => {
              logEvent(`web.${userType}.user_signup.signup_form.login.tap`);
              showLoginModal();
            }}
            color="#00bcf2"
            hoverColor="#00a8d9"
            display="inline"
          >
            <Translate path="components.signup_teacher.mean_to_login" />
          </Link>
        </>
      )}
      {apiAnswer === "email-error" && (
        <>
          <Text fontSize="2" display="inline">
            <Translate path="components.signup_teacher.invalid_email" />
          </Text>
        </>
      )}
      {apiAnswer === "password-matches-email-error" && (
        <>
          <Text fontSize="2" display="inline">
            <Translate path="components.signup_teacher.password_matches_email" />
          </Text>
        </>
      )}
      {apiAnswer === "common-password-error" && (
        <>
          <Text fontSize="2" display="inline">
            <Translate path="components.signup_teacher.common_password" />
          </Text>
        </>
      )}
    </Box>
  );
};

type SignupFormData = {
  title?: string;
  titleCustom?: string;
  firstName?: string;
  lastName?: string;
  emailAddress?: string;
  password?: string;
  leaderRole?: string;
  referralId?: string;
  dataTransferConsentChecked: boolean;
  privacyConsentChecked: boolean;
  dataTransferConsent?: boolean;
};

export type SignupFormDataInput = {
  email?: string;
  title?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
};
type SignupFormProps = {
  userType: "teacher" | "school_leader";
  formData?: SignupFormDataInput;
  newStyles?: boolean;
};

function prefixObj(obj: any, prefix: string): { [k: string]: unknown } {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => {
      return [`${prefix}${key}`, typeof value === "object" ? prefixObj(value, prefix) : value];
    }),
  );
}

const applyDojoText = (newStyles: boolean) =>
  newStyles
    ? css`
        font-family: DojoText;
      `
    : "";

const applyDojoButton = (newStyles: boolean) =>
  newStyles
    ? css`
        font-family: DojoText;
        &:enabled {
          background-color: #884dff;
          &:hover {
            background-color: #7a43e6;
            border-color: #7a43e6;
          }
        }
      `
    : "";

const applyDojoLink = (newStyles: boolean) =>
  newStyles
    ? css`
        font-family: DojoText;
        color: #3a7fe7;
        font-weight: inherit;
        &:hover {
          color: #3a7fe7;
          text-decoration: underline;
        }
      `
    : "";

function validateForm(values: SignupFormData, { needsDataTransferConsent }: { needsDataTransferConsent: boolean }) {
  const errors: FormErrors<SignupFormData> = {};
  if (!values.title) {
    errors.title = true;
  }
  if (values.title === "other" && !values.titleCustom) {
    errors.titleCustom = true;
  }
  if (!values.firstName) {
    errors.firstName = true;
  }
  if (!values.lastName) {
    errors.lastName = true;
  }
  if (!isValidNYCPassword(values.password, values.emailAddress)) {
    errors.password = true;
  }
  // eslint-disable-next-line no-useless-escape
  const emailRe = /^(?=\S{3,128}$)[^\s\\;,:]+@[^\s\\;,:\.]{1}[^\s\\;,:]*\.[^\s\\;,:0-9]+$/;
  const emailValue = values.emailAddress ?? "";
  if (
    !emailRe.test(emailValue) ||
    /@@/.test(emailValue) ||
    /\.\./.test(emailValue) ||
    // eslint-disable-next-line no-useless-escape
    /[`=<>\(\)\!\/\?#,\[\]\|"\\ğı]/.test(emailValue)
  ) {
    errors.emailAddress = true;
  }

  // eslint-disable-next-line no-control-regex
  const nonAsciiCharRegex = /[^\x00-\x7F]/;
  const local = emailValue && emailValue.split("@")[0];

  if (!local || nonAsciiCharRegex.test(local)) {
    errors.emailAddress = true;
  }

  if (needsDataTransferConsent && !values.privacyConsentChecked) {
    errors.privacyConsentChecked = true;
  }

  return errors;
}

const SignupForm: React.FC<
  SignupFormProps & {
    showLoginModal: () => void;
    closeModal: () => void;
    needsDataTransferConsent: boolean;
    updateSession: () => void;
    referralId: string | undefined;
  }
> = ({
  userType,
  formData,
  newStyles,
  showLoginModal,
  closeModal,
  needsDataTransferConsent,
  updateSession,
  referralId,
}) => {
  const t = useContext(TranslationContext);
  const featureFlags = useFeatureFlagsWithOverrides();

  const redirectionContext = useContext(ActivationRedirectionContext);

  const { href } = useLocation();
  const params = getQueryParams();

  const [emailSelected, setEmailSelected] = useState<boolean>(false);
  const [passwordFieldTouched, setPasswordFieldTouched] = useState<boolean>(false);
  const [passwordFieldBlurred, setPasswordFieldBlurred] = useState<boolean>(false);
  const [apiAnswer, setApiAnswer] = useState<ApiAnswerState | null>(null);
  const [selectedAttribution, setSelectedAttribution] = useState<AttributionAnswers>("");
  const [showTitleInput, setShowTitleInput] = useState<boolean>(false);

  const initialValues: SignupFormData = {
    title: formData?.title || "",
    firstName: formData?.firstName || "",
    lastName: formData?.lastName || "",
    emailAddress: formData?.email || "",
    password: formData?.password || "",
    privacyConsentChecked: false,
    dataTransferConsentChecked: false,
    referralId,
  };

  const isBettUser = window.location.pathname.includes("bett");

  function submitForm(values: SignupFormData, { setSubmitting }: { setSubmitting: (submitting: false) => void }) {
    const location = window.location;
    let ORIGIN = location.origin;
    if (process.env.GATSBY_ENV === "development") ORIGIN = "";
    const TEACHER_API = ORIGIN + "/api/teacher";
    le({
      eventName: `web.${userType}.user_signup.signup_form.create_account.tap`,
      eventValue: "domain_email_signup_overlay_variant",
      metadata: featureFlags,
    });
    le("externalPage.teacher_or_school_leader.signup.click");
    const signupPath = (location.pathname + location.search).substr(1);

    const attribution = cookies.get("attribution");

    function getPaidAttribution() {
      const paidAttr = cookies.get("paid_attribution");
      if (!paidAttr) return null;
      const [campaign, source] = paidAttr.split("&").map((item) => item.split("=")[1]);
      return { paid_campaign: campaign, paid_source: source };
    }

    const postSignupQuery = {
      stage: "select_school",
      from: "www",
      signupSource: "www",
    };

    const preventRedirect = window.location.pathname.includes("/conundrums");

    const getErrorDetail = (error: { response: { data?: { error?: { detail: string } } } }) => {
      try {
        return error.response.data?.error?.detail || "";
      } catch (err) {
        return "";
      }
    };

    const role = values.leaderRole ?? userType;
    const postBody = {
      title: values.title === "other" ? values.titleCustom : values.title,
      firstName: values.firstName,
      lastName: values.lastName,
      emailAddress: values.emailAddress,
      password: values.password,
      referralId: values.referralId,
      role,
      includeUserConfig: true,
      signupPath,
      locale: t.translations?.currentLocale || "en-US",
    };
    axios
      .post(TEACHER_API, postBody, {
        withCredentials: true,
      })
      .then(function (response: any) {
        setApiAnswer("success");
        const existingAccount = !!response.data?.type;
        const entityId = existingAccount ? response.data[response.data.type]?._id ?? "" : response.data._id;
        if (entityId) {
          setEntityId(entityId).then(function () {
            if (!existingAccount) {
              le({
                eventName: "web.signup.success",
                metadata: {
                  current_site: "external",
                  account_type: role,
                  isBettBrazilUser: isBettUser,
                },
              });
            }

            let initReferrerInLocalStorage, lastReferrerInLocalStorage;
            try {
              initReferrerInLocalStorage = JSON.parse(LocalStorageWrapper.getItem("init-referrer-data") || "{}");
              lastReferrerInLocalStorage = JSON.parse(LocalStorageWrapper.getItem("last-referrer-data") || "{}");
            } catch (err) {
              initReferrerInLocalStorage = null;
              lastReferrerInLocalStorage = null;
            }

            const paidAttribution = getPaidAttribution() || {};

            const initReferrerPrefixed = initReferrerInLocalStorage
              ? prefixObj(initReferrerInLocalStorage, "init_")
              : null;
            const lastReferrerPrefixed = lastReferrerInLocalStorage
              ? prefixObj(lastReferrerInLocalStorage, "last_")
              : null;
            le({
              eventName: `web.${userType}.user_signup.signup_form.account_created`,
              eventValue: href,
              metadata: { ...initReferrerPrefixed, ...lastReferrerPrefixed, ...paidAttribution, ...params },
            });
          });
        }

        incrementMetric("external_site.teacher_signup.success");
        axios
          .post(
            ORIGIN + "/api/session",
            {
              password: values.password,
              login: values.emailAddress,
            },
            {
              withCredentials: true,
            },
          )
          .then(() => {
            if (existingAccount) {
              le({
                eventName: "web.login.success",
                metadata: {
                  current_site: "external",
                  account_type: role,
                  existingExternalAccount: true,
                },
              });
            }
            if (isExperimentAttributionTestGroup) {
              le({
                eventName: `web.${userType}.user_signup.hdyhau`,
                eventValue: selectedAttribution,
                experiments: [experimentAttribution],
              });
            }
            convertAttributionExperiment();
            convertHomepageExperiment();
            convertSchoolsHeroExperiment();
            if (!redirectionContext.getRedirectionStatus()) {
              redirectionContext.runSuccessAction();
              updateSession();
              closeModal();
              return;
            } else if (preventRedirect) {
              if (query.get("referrerId")) {
                le({
                  eventName: `web.${userType}.user_signup.sign_up_from_shared_url`,
                  eventValue: href,
                  metadata: { ...params, attribution },
                });
              }
              window.location.reload();
              return;
            } else {
              logEvent(`web.${userType}.user_signup.redirect_to_teach`);
              const POST_SIGNUP_URL = `${process.env.GATSBY_POST_SIGNUP_URL}/onboarding-v3/signup?${query.stringify(
                postSignupQuery,
              )}`;
              window.location.href = POST_SIGNUP_URL;
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch(function (error) {
        const errorDetail = getErrorDetail(error);
        le({
          eventName: "web.signup.failure",
          metadata: {
            current_site: "external",
            account_type: role,
          },
        });
        if (errorDetail === "Invalid password: Password cannot match email") {
          logEvent(`web.${userType}.user_signup.signup_form.password_matches_email`);
          incrementMetric("external_site.teacher_signup.password_matches_email");
          setApiAnswer("password-matches-email-error");
        } else if (errorDetail === "Weak password: Password must not contain common passwords.") {
          logEvent(`web.${userType}.user_signup.signup_form.common_password`);
          incrementMetric("external_site.teacher_signup.common_password");
          setApiAnswer("common-password-error");
        } else if (errorDetail.includes("Email already exists")) {
          logEvent(`web.${userType}.user_signup.signup_form.email_exists`);
          incrementMetric("external_site.teacher_signup.email_exists");
          setApiAnswer("email-exists-error");
        } else if (errorDetail === "Please provide a valid email address") {
          logEvent(`web.${userType}.user_signup.signup_form.invalid_email`);
          incrementMetric("external_site.teacher_signup.invalid_email");
          setApiAnswer("email-error");
        } else {
          logEvent(`web.${userType}.user_signup.signup_form.unknown_error`);
          incrementMetric("external_site.teacher_signup.unknown_error");
          setApiAnswer("api-error");
        }
      })
      .then(function () {
        setSubmitting(false);
      });
  }

  const experimentAttribution = ExternalSwitches.WEB_ATTRIBUTION_SURVEY;
  const schoolsHeroExperiment = ExternalSwitches.WEB_EXTERNAL_SCHOOLS_PAGE_HERO;
  const isExperimentAttributionTestGroup = featureFlags && featureFlags[experimentAttribution] === "test";
  useStartExperiment(experimentAttribution);
  const convertAttributionExperiment = useCreateConvertExperimentEvent(experimentAttribution);
  const convertSchoolsHeroExperiment = useCreateConvertExperimentEvent(schoolsHeroExperiment);
  const convertHomepageExperiment = useCreateConvertExperimentEvent(
    ExternalSwitches.WEB_EXTERNAL_HOMEPAGE_EXPERIMENT_2024,
  );

  const initialValuesForAttribution = [
    "youtube",
    "search",
    "used_parent_student",
    "recommended",
    "tiktok",
    "socialmedia",
    "school_uses",
    "dojo_ambassador",
    "dojo_mentor",
  ];
  const randomizedValuesForAttribution = _.shuffle(initialValuesForAttribution);

  return (
    <>
      <Formik
        initialValues={{
          ...initialValues,
          title: t.translate("titles.ms") as string,
          leaderRole: userType === "school_leader" ? "principal" : undefined,
        }}
        validate={(values) => validateForm(values, { needsDataTransferConsent })}
        onSubmit={submitForm}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, setFieldValue }) => {
          const renderEmailInput = () => {
            return (
              <>
                <MailCheck email={values.emailAddress}>
                  {(suggestion: { full: string }) => (
                    <>
                      {suggestion &&
                        suggestion.full.toLowerCase() != values?.emailAddress?.toLowerCase() &&
                        !emailSelected && (
                          <Flex justifyContent="center">
                            <InputInfo
                              display="inline-block"
                              onClick={() => setFieldValue("emailAddress", suggestion.full)}
                              css={css`
                                cursor: pointer;
                              `}
                            >
                              {t.translate("components.signup_teacher.suggest_email", { email: suggestion.full })}
                            </InputInfo>
                          </Flex>
                        )}
                      <Input
                        rounded
                        aria-label={t.translate("pages.home.email") as string}
                        placeholder={t.translate("pages.home.email") as string}
                        autoComplete="email"
                        marginBottom={15}
                        name="emailAddress"
                        error={!!errors.emailAddress && touched.emailAddress}
                        aria-invalid={!!errors.emailAddress && touched.emailAddress}
                        onChange={handleChange}
                        onBlur={(e) => {
                          setEmailSelected(false);
                          logEvent("web." + userType + ".user_signup.signup_form.email_entry.fill");
                          handleBlur(e);
                        }}
                        onFocus={() => setEmailSelected(true)}
                        value={values.emailAddress}
                        required
                        newStyles={newStyles}
                      />
                      <Transition>
                        {!!errors.emailAddress && touched.emailAddress ? (
                          <AnimatedInfoMessage key="email-error">
                            <InputError role="alert" aria-live="polite">
                              {t.translateWithFallback({
                                str: "components.signup_teacher.invalid_email",
                                fallback: "Please enter a valid email",
                              })}
                            </InputError>
                          </AnimatedInfoMessage>
                        ) : (
                          <div key="email-error"></div>
                        )}
                      </Transition>
                    </>
                  )}
                </MailCheck>
                <Transition>
                  {emailSelected && (
                    <AnimatedInfoMessage key="email-info">
                      <InputInfo>{t.translate("components.signup_teacher.use_school_email")}</InputInfo>
                    </AnimatedInfoMessage>
                  )}
                </Transition>
              </>
            );
          };
          return (
            <form onSubmit={handleSubmit} css={applyDojoText(newStyles)}>
              {isSubmitting && (
                <Box width="50px" height="50px" mb={4} mx="auto">
                  <img alt="Loading Mojo" src={loadingMojo}></img>
                </Box>
              )}
              {initialValues.emailAddress && renderEmailInput()}
              <Select
                marginBottom={15}
                name="title"
                onChange={(event) => {
                  if (event.target.value === "other") {
                    setShowTitleInput(true);
                  } else {
                    setShowTitleInput(false);
                  }
                  handleChange(event);
                }}
                onBlur={handleBlur}
                value={values.title}
                newStyles={newStyles}
                aria-label={t.translate("pages.home.honorific_title") as string}
              >
                <option>{t.translate("titles.ms")}</option>
                <option>{t.translate("titles.miss")}</option>
                <option>{t.translate("titles.mrs")}</option>
                <option>{t.translate("titles.mr")}</option>
                <option>{t.translate("titles.dr")}</option>
                <option>{t.translate("titles.prof")}</option>
                <option value="other">{t.translate("titles.other")}</option>
              </Select>
              {showTitleInput && (
                <Input
                  rounded
                  aria-label={t.translate("pages.home.honorific_title") as string}
                  placeholder={t.translate("pages.home.honorific_title") as string}
                  marginBottom={15}
                  name="titleCustom"
                  error={!!errors.titleCustom && touched.titleCustom}
                  aria-invalid={!!errors.titleCustom && touched.titleCustom}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.titleCustom}
                  maxLength={20}
                  required
                  newStyles={newStyles}
                />
              )}
              <Input
                rounded
                aria-label={t.translate("pages.home.first_name") as string}
                placeholder={t.translate("pages.home.first_name") as string}
                autoComplete="given-name"
                marginBottom={15}
                name="firstName"
                error={!!errors.firstName && touched.firstName}
                aria-invalid={!!errors.firstName && touched.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.firstName}
                required
                newStyles={newStyles}
              />
              <Transition>
                {errors.firstName && touched.firstName ? (
                  <AnimatedInfoMessage key="firstName-error">
                    <InputError role="alert" aria-live="polite">
                      <Translate path="page.home.please_first_name" fallback="Please enter a first name" />
                    </InputError>
                  </AnimatedInfoMessage>
                ) : (
                  <div key="firstName-error"></div>
                )}
              </Transition>
              <Input
                rounded
                aria-label={t.translate("pages.home.last_name") as string}
                placeholder={t.translate("pages.home.last_name") as string}
                autoComplete="family-name"
                marginBottom={15}
                name="lastName"
                error={!!errors.lastName && touched.lastName}
                aria-invalid={!!errors.lastName && touched.lastName}
                onChange={(evt) => {
                  logEvent("web." + userType + ".user_signup.signup_form.name_entry.fill");
                  handleChange(evt);
                }}
                onBlur={handleBlur}
                value={values.lastName}
                required
                newStyles={newStyles}
              />
              <Transition>
                {errors.lastName && touched.lastName ? (
                  <AnimatedInfoMessage key="lastName-error">
                    <InputError role="alert" aria-live="polite">
                      <Translate path="page.home.please_last_name" fallback="Please enter a last name" />
                    </InputError>
                  </AnimatedInfoMessage>
                ) : (
                  <div key="lastName-errorr"></div>
                )}
              </Transition>
              {!initialValues.emailAddress && renderEmailInput()}
              <Input
                rounded
                aria-label={t.translate("pages.home.password") as string}
                placeholder={t.translate("pages.home.password") as string}
                autoComplete="off"
                marginBottom={15}
                type="password"
                name="password"
                error={!!errors.password && touched.password}
                aria-invalid={!!errors.password && touched.password}
                onChange={handleChange}
                onBlur={(e) => {
                  setPasswordFieldBlurred(true);
                  handleBlur(e);
                }}
                onFocus={() => {
                  setApiAnswer(null);
                  setPasswordFieldTouched(true);
                }}
                value={values.password}
                required
                newStyles={newStyles}
              />
              <PasswordValidationMessage
                password={values.password}
                pwFieldBlurred={passwordFieldBlurred}
                pwFieldTouched={passwordFieldTouched}
              />

              {["school_leader", "teacher"].includes(userType) && (
                <Select
                  marginBottom={15}
                  name="leaderRole"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.leaderRole}
                  newStyles={newStyles}
                >
                  {userType === "teacher" && (
                    <option value="teacher">{t.translate("pages.home.teacher_signup")}</option>
                  )}
                  <option value="principal">{t.translate("school_leader_roles.principal")}</option>
                  <option value="assistant_principal">{t.translate("school_leader_roles.assistant_principal")}</option>
                  <option value="school_leader">{t.translate("school_leader_roles.school_leader")}</option>
                  <option value="school_staff">
                    {t.translateWithFallback({ str: "school_leader_roles.school_staff", fallback: "School staff" })}
                  </option>
                </Select>
              )}
              {isExperimentAttributionTestGroup && (
                <Select
                  marginBottom={15}
                  name="attributionQuestion"
                  aria-label={t.translate("components.signup_teacher.hdyhau") as string}
                  value={selectedAttribution}
                  defaultValue=""
                  onChange={(e) => {
                    le({
                      eventName: `web.${userType}.user_signup.hdyhau.change`,
                      eventValue: e.target.value,
                      experiments: [experimentAttribution],
                    });
                    setSelectedAttribution(e.target.value as AttributionAnswers);
                  }}
                  className={selectedAttribution === "" ? "placeholder" : ""}
                  newStyles={newStyles}
                >
                  <option disabled value="">
                    {t.translate("components.signup_teacher.hdyhau") as string}
                  </option>
                  {randomizedValuesForAttribution.map((value) => (
                    <option value={value} key={value}>
                      {t.translate(`components.signup_teacher.${value}`) as string}
                    </option>
                  ))}
                  <option value="other">{t.translate("components.signup_teacher.other")}</option>
                </Select>
              )}
              {needsDataTransferConsent ? (
                <>
                  <Field name="privacyConsentChecked">
                    {({ field }: { field: { value: string } }) => (
                      <Checkbox checked={!!field.value} {...field} name="privacyConsentChecked">
                        <DetailText css={applyDojoText(newStyles)}>
                          {t.translate("safe_harbor.agree")}{" "}
                          <PrivacyLink
                            target="_blank"
                            href={getRelativePath("/privacy/")}
                            css={applyDojoLink(newStyles)}
                          >
                            {t.translate("safe_harbor.policy")}
                          </PrivacyLink>{" "}
                          {t.translate("safe_harbor.consent2")}{" "}
                          <PrivacyLink target="_blank" href={getRelativePath("/terms/")} css={applyDojoLink(newStyles)}>
                            {t.translate("safe_harbor.terms")}.{" "}
                          </PrivacyLink>
                        </DetailText>
                      </Checkbox>
                    )}
                  </Field>
                </>
              ) : (
                <Box textAlign={newStyles ? "center" : "left"} width="90%" margin="auto">
                  <Text display="inline" fontSize={16} mr="5px" css={applyDojoText(newStyles)}>
                    {t.translate("safe_harbor.consent1")}
                  </Text>
                  <Link
                    target="_blank"
                    href={getRelativePath("/terms/")}
                    display="inline"
                    color="#18c3ff"
                    hoverColor="#0096cb"
                    css={applyDojoLink(newStyles)}
                  >
                    {t.translate("safe_harbor.terms")}
                  </Link>
                  <Text display="inline" fontSize={16} mx="5px" css={applyDojoText(newStyles)}>
                    {t.translate("safe_harbor.consent2")}
                  </Text>
                  <Link
                    target="_blank"
                    href={getRelativePath("/privacy/")}
                    display="inline"
                    color="#18c3ff"
                    hoverColor="#0096cb"
                    css={applyDojoLink(newStyles)}
                  >
                    {t.translate("safe_harbor.policy")}
                  </Link>
                  {"."}
                </Box>
              )}
              <Button
                big
                width="100%"
                my="15px"
                type="submit"
                id={`${userType}_signup_button`}
                disabled={isSubmitting || Object.keys(errors).length > 0 || Object.keys(touched).length === 0}
                css={applyDojoButton(newStyles)}
              >
                {t.translate("pages.home.sign_up")}
              </Button>
              <ApiAnswerDetails apiAnswer={apiAnswer} showLoginModal={showLoginModal} userType={userType} />
            </form>
          );
        }}
      </Formik>
    </>
  );
};

const SignupFormContainer = ({ userType, ...props }: SignupFormProps) => {
  const modalContext = useContext(ModalContext);
  const appData = useContext(AppDataContext);
  function showLoginModal() {
    if (userType === "teacher") {
      modalContext.showModal(ModalType.TeacherLogin);
    }
    if (userType === "school_leader") {
      modalContext.showModal(ModalType.SchoolLeaderLogin);
    }
  }

  const [transferDataQueryParam] = useQueryParamString("transferData", ""); // key, defaultValue

  const needsDataTransferConsent = transferDataQueryParam
    ? transferDataQueryParam !== "false"
    : appData.data.needsDataTransferConsent;

  le({ eventName: `web.${userType}.user_signup.locale`, eventValue: fixLocale(currentLanguage()) });
  useEffect(() => {
    le({
      eventName: "web.signup.screen_view",
      metadata: {
        current_site: "external",
        account_type: userType,
      },
    });
  }, [userType]);

  const [referalCode] = useQueryParamString("r", ""); // key, defaultValue
  useEffect(() => {
    if (referalCode) {
      cookies.expire("dojoReferalCode");
      cookies.set("dojoReferalCode", referalCode, { expires: Infinity });
      le({
        eventName: `web.${userType}.user_signup.signup_form.visited_with_invite_code`,
        eventValue: referalCode,
      });
    } else {
      logEvent(`web.${userType}.user_signup.signup_form.visited`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SignupForm
      {...props}
      userType={userType}
      showLoginModal={showLoginModal}
      closeModal={modalContext.hideModal}
      needsDataTransferConsent={needsDataTransferConsent}
      updateSession={appData.services.getSession}
      referralId={referalCode || undefined}
    />
  );
};

export default SignupFormContainer;
