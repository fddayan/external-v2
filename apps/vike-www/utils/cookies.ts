import cookies from "cookies-js";

const DESIRED_LANGUAGE = "dojoDesiredLanguage";
const FEATURE_SWITCH_ID = "dojo_www_feature_flag_id";

const setLanguageCookie = (lang: string) => {
  cookies.expire(DESIRED_LANGUAGE);
  cookies.set(DESIRED_LANGUAGE, lang.toLowerCase(), {
    expires: Infinity,
  });
};

const setFeatureSwitchesIdCookie = (featureSwitchId: string) => {
  cookies.set(FEATURE_SWITCH_ID, featureSwitchId.toLowerCase(), {
    expires: Infinity,
  });
};

function cookiesWork() {
  if (typeof window === "undefined" || (cookies && !cookies.get)) return false;
  return true;
}

export { setLanguageCookie, DESIRED_LANGUAGE, cookiesWork, setFeatureSwitchesIdCookie, FEATURE_SWITCH_ID };
