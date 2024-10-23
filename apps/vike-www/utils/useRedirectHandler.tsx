import { useLayoutEffect } from "react";
import window from "global/window";

const GLOBAL_REDIRECT_PARAMS = ["utm_campaign"] as const;

const getQueryParamsForRedirect = (additionalQueryParams: string[] = []) => {
  const params = new URLSearchParams(window.location.search || "");
  const keys = [...params.keys()];
  const allowedQueryParams = [...GLOBAL_REDIRECT_PARAMS, ...additionalQueryParams];
  for (const key of keys) {
    if (!allowedQueryParams.includes(key) || !params.get(key)) {
      params.delete(key);
    }
  }

  return params;
};

const getFullRedirectLink = (redirectLink: string, queryParams: URLSearchParams) => {
  const queryParamString = queryParams.toString();

  if (!queryParamString) {
    return redirectLink;
  }

  const hasQueryParamInRedirectLink = redirectLink.includes("?");
  const separator = hasQueryParamInRedirectLink ? "&" : "?";
  return `${redirectLink}${separator}${queryParamString}`;
};

export const useRedirectHandler = (f: () => string | undefined) => {
  useLayoutEffect(() => {
    const redirectLink = f();
    const allowedQueryParamsFromUniversalLink = getQueryParamsForRedirect();
    const modifiedRedirectLink = getFullRedirectLink(redirectLink, allowedQueryParamsFromUniversalLink);
    let timeout;

    if (modifiedRedirectLink) {
      timeout = setTimeout(() => {
        window.location.replace(modifiedRedirectLink);
      }, 300);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
