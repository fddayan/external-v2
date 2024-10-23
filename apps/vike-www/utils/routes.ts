import Axios from "@src/utils/requests/axiosInstance";
import query from "./query";
import cookies from "cookies-js";
import { DESIRED_LANGUAGE } from "./cookies";
import window from "global/window";
import { navigate } from "gatsby";

const generatingFor = { locale: undefined };

const SUPPORTED = {
  "ca-es": 1,
  "en-us": 1,
  "en-gb": 1,
  "es-mx": 1,
  "es-es": 1,
  "de-de": 1,
  "fr-fr": 1,
  "fr-ca": 1,
  "hi-in": 1,
  "id-id": 1,
  "fil-ph": 1,
  "pl-pl": 1,
  "pt-br": 1,
  "pt-pt": 1,
  "tr-tr": 1,
  "th-th": 1,
  "ru-ru": 1,
  "uk-ua": 1,
  "ar-ar": 1,
  "ko-kr": 1,
  "zh-cn": 1,
  "ja-jp": 1,
  "vi-vn": 1,
};

const IDEAS_SUPPORTED = {
  "en-us": 1,
  "tr-tr": 1,
  "es-es": 1,
};

const localeRe = /^[a-z]{2}-[A-Z]{2}/;

const origin = () => {
  let loc;
  if (window.location.origin) {
    return window.location.origin;
  }
  loc = window.location.protocol + "//" + window.location.hostname;
  if (window.location.port) {
    loc += ":" + window.location.port;
  }
  return loc;
};

const looksLikeLanguage = (str) => {
  let result;
  if (typeof str !== "string") {
    result = false;
  } else if (str.length === 5) {
    result = str[2] === "-";
  } else if (str.length === 6) {
    result = str[3] === "-";
  } else {
    result = false;
  }
  return result;
};

const currentLanguage = () => {
  let path;
  if (typeof location === "undefined") {
    return "en-us";
  }
  path = location.pathname;
  path = path.split("/");
  if (path[0] === "") {
    path.shift();
  }
  if (looksLikeLanguage(path[0])) {
    return path[0].toLowerCase();
  }
  return "en-us";
};

const fixLocale = function (locale) {
  let err;
  try {
    if (locale == null) {
      locale = "en-US";
    }
    locale = locale.split("-");
    locale = locale[0].toLowerCase() + "-" + locale[1].toUpperCase();
    if (!localeRe.test(locale)) {
      locale = "en-US";
    }
    return locale;
  } catch (_error) {
    err = _error;
    return "en-US";
  }
};

const pathnameWithoutLanguage = () => {
  let path;
  path = location.pathname;
  path = path.split("/");
  if (path[0] === "") {
    path.shift();
  }
  if (looksLikeLanguage(path[0])) {
    path.shift();
  }
  return path.join("/");
};

const makeRedirect = (lang) => {
  const currentUrl = new URL(window.location.href);
  const newUrl = new URL(currentUrl.toString());
  newUrl.pathname = "/" + lang + "/" + pathnameWithoutLanguage();
  const searchParams = newUrl.searchParams;
  searchParams.set("redirect", "true");
  newUrl.search = searchParams.toString();
  return newUrl.pathname + newUrl.search + newUrl.hash;
};

function getRelativePath(path) {
  let locale = generatingFor.locale;
  if (locale && locale !== "en-US" && locale !== "en" && !path.includes("//")) {
    locale = locale.toLowerCase();
    path = `/${locale}${path}`;
  }
  return path;
}

function checkRedirect(site: "www" | "ideas" | "mobile") {
  if (typeof window === "undefined") return; //no need for this during server side rendering
  let url;

  let supportedLanguages;

  switch (site) {
    case "www":
      supportedLanguages = SUPPORTED;
      break;
    case "ideas":
      supportedLanguages = IDEAS_SUPPORTED;
      break;
    case "mobile":
      supportedLanguages = SUPPORTED;
      break;
    default:
      return;
  }

  let desiredLanguage = cookies.get(DESIRED_LANGUAGE);

  if (desiredLanguage) {
    desiredLanguage = desiredLanguage.toLowerCase();
  }

  if (desiredLanguage && !supportedLanguages[desiredLanguage.toLowerCase()]) {
    cookies.expire(DESIRED_LANGUAGE);
    return;
  }

  const redirect = query.get("redirect");

  const current = currentLanguage();

  if (redirect) {
    return;
  }

  if (current !== "en-us" && !redirect) {
    return;
  }

  if (desiredLanguage && desiredLanguage !== current) {
    url = makeRedirect(desiredLanguage);
    navigate(url, { replace: true });
    return;
  }

  if (!desiredLanguage) {
    Axios.get("/api/language?external=true")
      .then((body) => {
        const language = (body.data.language || "en-us").toLowerCase();
        if (!supportedLanguages[language]) {
          return;
        }
        cookies.set(DESIRED_LANGUAGE, language, {
          expires: Infinity,
        });
        if (current === language) {
          return;
        }
        url = makeRedirect(language);
        navigate(url, { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export { getRelativePath, checkRedirect, generatingFor, currentLanguage, fixLocale };
