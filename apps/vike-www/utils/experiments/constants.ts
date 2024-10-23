export const ExternalSwitches = {
  WEB_ATTRIBUTION_SURVEY: "web_attribution_survey_v2",
  WEB_EXTERNAL_ACTIVITY_CORNER_POPUP_SIGNUP: "web_external_activity_corner_popup_signup",
  WEB_EXTERNAL_HOMEPAGE_EXPERIMENT_2024: "web_external_homepage_experiment_2024_v7",
  WEB_EXTERNAL_LOGIN_OIDC_REDIRECT: "web_external_login_oidc_redirect_v1",
  WEB_EXTERNAL_SCHOOLS_COMMTEMPLATE_DOWNLOAD_MODAL: "web_external_schools_commtemplate_download_modal",
  WEB_EXTERNAL_SCHOOLS_PAGE_HERO: "web_external_school_page_hero",
} as const;

export const LiteSwitches = {
  WEB_LITE_REDIRECT_EMAIL_VERIFICATION: "web_lite_redirect_email_verification_v3",
} as const;
export const TeacherSwitches = {} as const;

export const featureSwitches = Object.values({ ...ExternalSwitches, ...TeacherSwitches, ...LiteSwitches });

export const defaultFSValues = featureSwitches.reduce((acc, fs) => ({ ...acc, [fs]: "off" }), {});
