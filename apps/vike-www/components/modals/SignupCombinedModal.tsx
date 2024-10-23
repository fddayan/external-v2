import React, { useContext, useEffect } from "react";
import CommonModal from "./CommonModal";
import { Button as NessieButton, ModalTitle, BodyText } from "@src/components/nessie-web";
import { useFormik } from "formik";
import Input from "@src/components/forms/Input";
import Button from "@src/components/Button";
import { validateEmail } from "@src/utils/requests/alternativeAccessMethods";
import { ModalContext, ModalType } from "./ModalController";
import { getSubdomainURL } from "@src/utils/getSubdomainURL";
import { TranslationContext } from "@src/components/translation/TranslationContext";
import { logEvent } from "@src/utils/logClient";
import { AppDataContext } from "../AppDataContext";
import { login } from "@src/utils/axiosLogin";
import { ActivationRedirectionContext } from "@src/contexts/ActivationRedirectionContext";
import { ExternalSwitches } from "@src/utils/experiments/constants";
import { useLazyStartExperiment } from "@src/utils/experiment";
import { useFeatureFlag } from "@src/utils/useFeatureFlag";

const SignupCombinedModal = ({
  closeModal,
  schoolLeader,
  customHeading,
  dismissCtaAction,

  newLoginFeatures = false,
}: {
  closeModal: () => void;
  schoolLeader?: boolean;
  customHeading?: { title: string; subtitle: string };
  dismissCtaAction?: () => void;
  startTeacherEmailFirstLoginExperiment?: boolean;
  newLoginFeatures?: boolean;
}) => {
  const {
    data: { geolocation },
    services,
  } = useContext(AppDataContext);
  const modalContext = useContext(ModalContext);
  const { translateWithFallback: translate } = useContext(TranslationContext);
  const redirectionContext = useContext(ActivationRedirectionContext);

  const startLazyLoginOidcRedirect = useLazyStartExperiment(ExternalSwitches.WEB_EXTERNAL_LOGIN_OIDC_REDIRECT);
  const lazyLoginOidcRedirectSwitch = useFeatureFlag(ExternalSwitches.WEB_EXTERNAL_LOGIN_OIDC_REDIRECT);

  const defaultLongSessionValue = !(geolocation && geolocation.state === "ny");
  useEffect(() => {
    logEvent({
      eventName: "web.login_or_signup.screen_view",
      metadata: {
        ref: "unknown",
        current_site: "external",
        account_type: schoolLeader ? "school_leader" : "teacher",
      },
    });
  }, [schoolLeader]);

  const tryLogin = async ({
    email,
    password,
    longSession,
  }: {
    email: string;
    password: string;
    longSession: boolean;
  }) => {
    try {
      const response = await login({ login: email, password, longSession, userType: "teacher" });
      logEvent({
        eventName: "web.autologin.success",
        metadata: {
          current_site: "external",
          account_type: response.data.type,
        },
      });

      if (!redirectionContext.getRedirectionStatus()) {
        services.getSession();
        redirectionContext.runSuccessAction();
        modalContext.hideModal();
      } else {
        let redirectUrl = process.env.GATSBY_HOME_URL;
        if (response.data.type === "teacher") redirectUrl = process.env.GATSBY_TEACH_URL;
        else if (response.data.type === "student") redirectUrl = process.env.GATSBY_STUDENT_URL;
        window.location.href = redirectUrl ?? "";
      }
      return true;
    } catch (e) {
      logEvent({
        eventName: "web.autologin.failure",
        metadata: {
          current_site: "external",
        },
      });
      return false;
    }
  };

  const form = useFormik({
    initialValues: { email: "", password: "" },
    validate: (values) => {
      const emailRe = /^(?=\S{3,128}$)[^\s\\;,:]+@[^\s\\;,:.]{1}[^\s\\;,:]*\.[^\s\\;,:0-9]+$/;
      if (!values.email) {
        return {
          email: translate({ str: "components.login.combined_signup.required", fallback: "Email address is required" }),
        };
      } else if (!emailRe.test(values.email)) {
        return {
          email: translate({ str: "components.login.combined_signup.invalid_email", fallback: "Invalid email" }),
        };
      }
      return {};
    },
    validateOnChange: false,
    onSubmit: async ({ email, password }, { validateForm }) => {
      if (password && newLoginFeatures) {
        const loggedIn = await tryLogin({ email, password, longSession: defaultLongSessionValue });
        if (loggedIn) {
          return;
        }
      }
      const errors = await validateForm({ email });
      if (errors.email) {
        return;
      }
      const validation = await validateEmail({ email });

      const providers = validation.oidcProviders ?? [];
      const oidcProvider = providers.find((provider) => provider.isPreferred);

      // User is connected to a preferred OIDC provider and we should attempt to redirect them
      // Scoped to only teachers for now
      if (oidcProvider && validation.entityType === "teacher") {
        startLazyLoginOidcRedirect();

        if (lazyLoginOidcRedirectSwitch.actualValue === "test") {
          return (window.location.href = `https://www.classdojo.com/ul/t/oidc?issuer=${oidcProvider.slug}`);
        }
      }

      if (!validation?.isAvailableForSignUp && validation.entityType) {
        // closeModal();
        if (validation?.entityType === "teacher") {
          modalContext.showModal(ModalType.TeacherLogin, { emailPrefill: email });
        } else if (validation?.entityType === "parent") {
          modalContext.showModal(ModalType.ParentLogin, { emailPrefill: email });
        } else {
          window.location.href = getSubdomainURL("student");
        }
      } else if (schoolLeader) {
        modalContext.showModal(ModalType.SchoolLeaderSignupForm, { formData: { email } });
      } else {
        modalContext.showModal(ModalType.TeacherSignupForm, { formData: { email } });
      }
    },
  });

  return (
    <CommonModal closeModal={closeModal}>
      <form
        onSubmit={form.handleSubmit}
        style={{ width: "80%", maxWidth: "604px", display: "flex", flexDirection: "column", gap: 18 }}
      >
        <ModalTitle>
          {customHeading
            ? customHeading.title
            : schoolLeader
            ? translate({
                str: "components.login.combined_signup.get_started_school_leader",
                fallback: "Get started as a school leader",
              })
            : translate({
                str: "components.login.combined_signup.get_started_teacher",
                fallback: "Get started as a teacher",
              })}
        </ModalTitle>
        {customHeading && customHeading.subtitle && (
          <BodyText css={{ textAlign: "center" }}>{customHeading.subtitle}</BodyText>
        )}
        <div>
          <Input
            rounded
            value={form.values.email}
            onChange={(e) => {
              form.handleChange(e);
            }}
            onFocus={() => {
              form.setErrors({ email: "" });
            }}
            autoFocus
            id="email"
            name="email"
            type="text"
            placeholder={translate({ str: "components.common.email_address", fallback: "Email address" }) as string}
            error={!!form.errors.email && form.touched.email}
            aria-label={translate({ str: "components.common.email_address", fallback: "Email address" }) as string}
            aria-invalid={!!form.errors.email && form.touched.email}
          />
          <div style={{ opacity: 0, height: 0 }} aria-hidden>
            <Input
              tabIndex={-1}
              aria-label={translate("components.common.password") as string}
              placeholder={translate("components.common.password") as string}
              autoComplete="password"
              id="password"
              type="password"
              name="password"
              // eslint-disable-next-line @typescript-eslint/no-empty-function
              onChange={newLoginFeatures ? form.handleChange : () => {}}
              value={form.values.password}
            />
          </div>
          <div
            style={{
              // set for transition to work when expanding/shrinking
              maxHeight: form.errors.email && form.touched.email ? "14px" : "0px",
              minHeight: form.errors.email ? "14px" : "0px",
              transition: "0.2s",
              fontSize: "14px",
              marginTop: "6px",
              marginLeft: "8px",
            }}
          >
            {form.errors.email}
          </div>
        </div>
        <Button type="submit" style={{ width: "100%", minHeight: "50px" }} size="l" disabled={form.isSubmitting}>
          {translate({ str: "components.login.combined_signup.continue", fallback: "Continue" })}
        </Button>
        {dismissCtaAction && (
          <NessieButton
            style={{
              marginTop: 12,
              width: "100%",
            }}
            size="s"
            kind="tertiary"
            onClick={() => {
              dismissCtaAction();
              closeModal();
            }}
          >
            {translate({ str: "components.login.combined_signup.maybe_later", fallback: "Proceed without signing up" })}
          </NessieButton>
        )}
      </form>
    </CommonModal>
  );
};

export default SignupCombinedModal;
