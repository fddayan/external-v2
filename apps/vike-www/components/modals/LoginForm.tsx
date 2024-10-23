import { css } from "@emotion/react";
import styled from "@emotion/styled";
import loadingMojo from "@src/assets/images/loadingMojo.gif";
import lockedOutMojo from "@src/assets/images/login/locked_out.png";
import { AppDataContext } from "@src/components/AppDataContext";
import Checkbox from "@src/components/forms/Checkbox";
import CodeVerification from "@src/components/modals/LoginCode/CodeVerification";
import { OrSeparator } from "@src/components/OrSeparator";
import { Text } from "@src/components/Text";
import Translate from "@src/components/translation/Translate";
import { TranslationContext } from "@src/components/translation/TranslationContext";
import { ActivationRedirectionContext } from "@src/contexts/ActivationRedirectionContext";
import { logEvent as le, logEvent, setEntityId } from "@src/utils/logClient";
import axios from "axios";
import { FormikErrors, useFormik } from "formik";
import window from "global/window";
import _get from "lodash/get";
import React, { useContext, useEffect, useState } from "react";
import { color, layout, space } from "styled-system";
import { Box, Flex } from "../Boxes";
import Button from "../Button";
import Input from "../forms/Input";
import LoginWithCodeButton from "../LoginWithCodeButton";
import { Space, Subheading, theme } from "../nessie-web";
import LoginCodeContainer from "./LoginCode/LoginCodeContainer";
import { ModalContext, ModalType } from "./ModalController";

const {
  colors: { dt_taro10, dt_taro50 },
} = theme;

const Link = styled.a<{ hoverColor?: string; ml?: `${number}px`; display?: "inline" }>`
  display: inline-block;
  line-height: 18px;
  font-family: proxima-nova, "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-weight: 600;
  color: ${(props) => (props.color ? props.color : "#00B2F7")};
  text-decoration: none;
  cursor: pointer;
  &:hover,
  &:focus {
    text-decoration: none;
    color: ${(props) => (props.hoverColor ? props.hoverColor : "#0092E5")};
  }

  ${layout}
  ${space}
  ${color}
`;

const LinkButton = styled.div<{ hoverColor?: string; mb?: `${number}px`; mt?: `${number}px`; ml?: `${number}px` }>`
  display: inline-block;
  font-family: proxima-nova, "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-weight: 600;
  color: ${(props) => (props.color ? props.color : "#00B2F7")};
  text-decoration: none;
  cursor: pointer;
  &:hover,
  &:focus {
    text-decoration: none;
    color: ${(props) => (props.hoverColor ? props.hoverColor : "#0092E5")};
  }
  ${space}
`;

const StyledForm = styled("form")`
  width: 100%;
`;

const SignToWatchWrapper = styled("div")`
  background-color: ${dt_taro10};
  padding: 16px;
  text-align: center;
`;

type ApiAnswerState =
  | {
      code: "success" | "api-error" | "auth-error" | "auth-lockout" | "auth-suspended" | null;
    }
  | {
      code: "forced-otc";
      detail: {
        message: string;
      };
    };

const AuthErrorResponse = ({ remainingAttempts }: { remainingAttempts: number | null }) => {
  if (remainingAttempts === null) return null;

  const loginAttemptsCopy =
    remainingAttempts === 1 ? "components.login.one_attempt" : "components.login.num_of_attempts";
  if (remainingAttempts <= 5)
    return (
      <>
        <Text fontSize="2" fontWeight="bold" color="#2C2A50">
          <Translate path={loginAttemptsCopy} subs={{ attempts: remainingAttempts.toString() }} />
        </Text>
        <Text fontSize="2">
          <Translate path="components.login.lockout_warning" />
        </Text>
      </>
    );

  return (
    <>
      <Text fontSize="2" display="inline" role="alert" aria-live="polite">
        <Translate path="components.login.invalid_email_or_password" />
      </Text>
    </>
  );
};

const ApiAnswerDetails = ({
  apiAnswer,
  remainingAttempts,
}: {
  apiAnswer: ApiAnswerState;
  remainingAttempts: number | null;
}) => {
  if (apiAnswer.code === null) return null;

  const colorCss =
    apiAnswer.code === "success"
      ? css`
          background-color: #dff0d8;
          border-color: #d6e9c6;
          color: #3c763d;
          border-radius: 5px;
        `
      : css`
          background-color: #ffecee;
          color: #d72a2b;
          border-radius: 30px;
          font-weight: 600;
        `;
  return (
    <Box my={3} p={3} textAlign="center" css={colorCss}>
      {apiAnswer.code === "success" && (
        <Text fontSize="2">
          <Translate path="components.login.login_success" />
        </Text>
      )}
      {apiAnswer.code === "api-error" && (
        <>
          <Text fontSize="2" display="inline">
            <Translate path="components.login.login_error" />
          </Text>
          <Link ml="5px" href="https://status.classdojo.com" color="#00bcf2" hoverColor="#00a8d9" display="inline">
            <Translate path="components.login.check_status_page" />
          </Link>
        </>
      )}
      {apiAnswer.code === "auth-error" && <AuthErrorResponse remainingAttempts={remainingAttempts} />}
      {apiAnswer.code === "auth-suspended" && (
        <Text fontSize="2" display="inline" role="alert" aria-live="polite">
          <Translate path="components.login.suspended_user" />
        </Text>
      )}
    </Box>
  );
};

type LoginFormData = {
  login: string;
  password: string;
  longSession: boolean;
};
type LoginFormProps = {
  userType: "teacher" | "parent" | "leader";
  noRedirect?: boolean;
  closeModal?: () => void;
  signToWatch?: string;
  emailPrefill?: string;
  showCodeLogin?: boolean;
  disableHeader?: (disable: boolean) => void;
};

const LoginForm: React.FC<LoginFormProps> = ({
  userType,
  noRedirect,
  closeModal,
  signToWatch,
  emailPrefill,
  showCodeLogin,
  disableHeader,
}) => {
  const t = useContext(TranslationContext);
  const {
    data: { geolocation },
  } = useContext(AppDataContext);
  const modalContext = useContext(ModalContext);
  const appData = useContext(AppDataContext);
  const redirectionContext = useContext(ActivationRedirectionContext);

  function showSignupModal() {
    modalContext.showModal(ModalType.Signup);
  }

  useEffect(() => {
    le({
      eventName: "web.login.screen_view",
      metadata: {
        current_site: "external",
        account_type: userType,
      },
    });
  }, [userType]);

  const [apiAnswer, setApiAnswer] = useState<ApiAnswerState>({ code: null });
  const [remainingAttempts, setRemainingAttempts] = useState<number | undefined>(undefined);
  const isUserParent = userType === "parent";
  const defaultLongSessionValue = isUserParent ? !(geolocation && geolocation.state === "ny") : true;

  useEffect(() => {
    le({
      eventName: "web.external_page.login.detected_state",
      eventValue: geolocation && geolocation.state,
    });
  }, []);

  const form = useFormik<LoginFormData>({
    initialValues: { login: emailPrefill ?? "", password: "", longSession: defaultLongSessionValue },
    onSubmit: ({ login, password, longSession }, { setSubmitting }) => {
      const baseUrl =
        process.env.GATSBY_BUILD_WEBSITE === "ideas"
          ? process.env.GATSBY_IDEAS_API_URL
          : userType === "teacher"
          ? process.env.GATSBY_TEACHER_LOGIN_URL
          : process.env.GATSBY_DEFAULT_LOGIN_URL;
      const url = `${baseUrl}/api/session?duration=${longSession ? "long" : "short"}`;
      axios
        .post(
          url,
          {
            login,
            password,
            resumeAddClassFlow: !!window?.location?.href?.match(/\/connect/),
          },
          {
            withCredentials: true,
          },
        )
        .then((response: any) => {
          setApiAnswer({ code: "success" });
          const { data } = response;
          const entity = data.teacher || data.parent || data.student;
          if (entity) {
            setEntityId(entity._id);
          }

          le({
            eventName: "web.login.success",
            entityId: entity?._id,
            metadata: {
              current_site: "external",
              account_type: userType,
            },
          });
          if (!redirectionContext.getRedirectionStatus()) {
            appData.services.getSession();
            redirectionContext.runSuccessAction();
            modalContext.hideModal();
          } else if (noRedirect) {
            appData.services.getSession();
            modalContext.hideModal();
          } else {
            let redirectUrl = process.env.GATSBY_HOME_URL;
            if (response.data.type === "teacher") redirectUrl = process.env.GATSBY_TEACH_URL;
            else if (response.data.type === "student") redirectUrl = process.env.GATSBY_STUDENT_URL;
            window.location.href = redirectUrl ?? "";
          }
        })
        .catch((error) => {
          const loginAttemptsLeft = _get(error, "response.headers.remaining-attempts");
          le({
            eventName: "web.login.failure",
            metadata: {
              current_site: "external",
              account_type: userType,
            },
          });
          setRemainingAttempts(loginAttemptsLeft === (null || undefined) ? undefined : parseInt(loginAttemptsLeft, 10));
          const errorDetail = _get(error, "response.data.error.detail");
          const errorCode = _get(error, "response.data.error.code");
          const fallbackMessage = _get(error, "response.data.error.fallbackMessage");
          if (errorDetail === "Incorrect password" || errorDetail === "Incorrect username") {
            setApiAnswer({ code: "auth-error" });
          } else if (errorDetail === "Too many login attempts, user is temporarily locked out of login") {
            setApiAnswer({ code: "auth-lockout" });
          } else if (errorDetail === "User is suspended") {
            setApiAnswer({ code: "auth-suspended" });
          } else if (errorCode?.startsWith("ERR_MUST_USE_OTC")) {
            setApiAnswer({ code: "forced-otc", detail: { message: fallbackMessage } });
          } else if (errorCode === "ERR_COMPROMISED_PASSWORD") {
            if (userType === "parent") {
              window.location.href = `https://home.classdojo.com/#/forceReset?email=${encodeURIComponent(login)}`;
            } else {
              window.location.href = `https://teach.classdojo.com/#/forceReset?email=${encodeURIComponent(login)}`;
            }
          } else {
            const response = _get(error, "response.data");
            logEvent({
              eventName: "login.error.unknown.detail",
              value: errorDetail,
              metadata: { error: errorDetail, response },
            });
            setApiAnswer({ code: "api-error" });
          }
        })
        .then(function () {
          setSubmitting(false);
        });
    },
    validate: (values: LoginFormData) => {
      const errors: FormikErrors<LoginFormData> = {};
      if (values.login.length === 0) {
        errors.login = "length";
      }
      if (values.password.length === 0) {
        errors.password = "length";
      }
      return errors;
    },
  });

  function showForgotPasswordModal() {
    le({
      eventName: "web.account_recovery.forgot_password.reset_password_tap",
      metadata: {
        account_type: userType,
        current_site: "external",
      },
    });
    modalContext.showModal(ModalType.ResetPassword, { userType, previousEmail: form.values.login });
  }

  const [loginWithCode, setLoginWithCode] = useState(false);
  const updateLoginView = ({ showLoginWithCode }: { showLoginWithCode: boolean }) => {
    setLoginWithCode(showLoginWithCode);
    disableHeader(showLoginWithCode);
  };

  if (loginWithCode) {
    return (
      <LoginCodeContainer
        email={form.values.login || emailPrefill}
        goBackToLogin={({ email }) => {
          if (email) {
            form.setFieldValue("login", email);
          }
          updateLoginView({ showLoginWithCode: false });
        }}
        isUserParent={userType === "parent"}
        userType={userType}
      />
    );
  }

  if (apiAnswer.code === "auth-lockout") {
    return (
      <Box my={3} p={3} textAlign="center">
        <img alt="" src={lockedOutMojo} />
        <Text fontSize={4} fontWeight={800}>
          <Translate path="components.login.lockout_header" />
        </Text>
        <Text>
          <Translate path="components.login.lockout_desc" />
        </Text>
        <Button onClick={closeModal} width="100%">
          <Translate path="components.login.lockout_button" />
        </Button>
      </Box>
    );
  } else if (apiAnswer.code === "forced-otc") {
    return (
      <CodeVerification
        userType={userType}
        email={form.values.login}
        password={form.values.password}
        isUserParent={userType === "parent"}
        headerText={apiAnswer.detail.message}
      />
    );
  }

  return (
    <StyledForm onSubmit={form.handleSubmit} data-test-name="login-form">
      {signToWatch && (
        <>
          <SignToWatchWrapper>
            <Subheading color={dt_taro50}>{signToWatch}</Subheading>
          </SignToWatchWrapper>
          <Space size="m" />
        </>
      )}
      {form.isSubmitting && (
        <Box width="50px" height="50px" mb={4} mx="auto">
          <img alt="Loading mojo" src={loadingMojo}></img>
        </Box>
      )}
      <Input
        aria-label={t.translate("components.common.email_address") as string}
        placeholder={t.translate("components.common.email_address") as string}
        autoComplete="email"
        marginBottom={15}
        name="login"
        onChange={form.handleChange}
        value={form.values.login}
        success={!form.errors.login && form.touched.login}
        error={!!form.errors.login && form.touched.login}
        onBlur={form.handleBlur}
      />
      <Input
        aria-label={t.translate("components.common.password") as string}
        placeholder={t.translate("components.common.password") as string}
        autoComplete="off"
        type="password"
        name="password"
        onChange={form.handleChange}
        autoFocus={!!emailPrefill}
        value={form.values.password}
        success={!form.errors.password && form.touched.password}
        error={!!form.errors.password && form.touched.password}
        onBlur={form.handleBlur}
      />
      <LinkButton
        role="button"
        aria-label="Click here to recover password"
        tabIndex={0}
        onClick={showForgotPasswordModal}
        onKeyDown={(e) => e.key === "Enter" && showForgotPasswordModal()}
        color="#00bcf2"
        hoverColor="#00a8d9"
        mb="5px"
        mt="5px"
      >
        {t.translate("components.login.forget_password")}
      </LinkButton>
      <ApiAnswerDetails apiAnswer={apiAnswer} remainingAttempts={remainingAttempts ?? null} />
      <Button
        disabled={form.isSubmitting || ((!form.isValid || !form.dirty) && !showCodeLogin)}
        type="submit"
        big
        square
        width="100%"
        my="5px"
      >
        {t.translate("pages.home.log_in")}
      </Button>
      {isUserParent && (
        <Checkbox name="longSession" checked={!!form.values.longSession} onChange={form.handleChange}>
          Keep me logged in
        </Checkbox>
      )}
      <Flex justifyContent="center" alignItems="center" mt="5px">
        <Text fontSize={2}> {t.translate("components.login.dont_have_account")}</Text>
        <LinkButton
          role="button"
          tabIndex={0}
          onClick={showSignupModal}
          onKeyDown={(e) => e.key === "Enter" && showSignupModal()}
          color="#00bcf2"
          hoverColor="#00a8d9"
          mb="10px"
          ml="5px"
        >
          {t.translate("pages.home.sign_up")}
        </LinkButton>
      </Flex>
      {showCodeLogin && (
        <>
          <OrSeparator />
          <LoginWithCodeButton loginWithCode={() => updateLoginView({ showLoginWithCode: true })} />
        </>
      )}
    </StyledForm>
  );
};

export default LoginForm;
