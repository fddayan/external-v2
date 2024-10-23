import React, { useEffect, useRef } from "react";
import Helmet from "react-helmet";
import cookies from "cookies-js";
import window from "global/window";
import { LocalStorageWrapper } from "@src/utils/localStorage";
import { isProduction } from "@src/utils/env";

export const performanceCookieConsentSet = () => {
  if (!cookies.get) {
    return null;
  }

  const oneTrustCookie = cookies.get("OptanonConsent");
  // This is the cookie value we look at to decide if a user is redacted or not
  // set by one trust
  if (!oneTrustCookie) {
    return null;
  }

  if (oneTrustCookie.includes("C0002:1")) {
    return true;
  }
  if (oneTrustCookie.includes("C0002:0")) {
    return false;
  }

  return null;
};

const OneTrustScript = ({ setPerformanceCookieConsent, setTargetingCookieConsent, setFunctionalCookieConsent }) => {
  const performanceCookieConsentRef = useRef(performanceCookieConsentSet());
  const interactionCounterRef = useRef(null);

  // OneTrust won't trigger `OneTrustGroupsUpdated` when you land clean on a non-GDPR country
  // in order to have the proper value of the cookie for those users without having to reload the page
  // when check for the cookie value in a interval and once the "groups=" is found on the string it stops
  // what happens for users on US for example is that when `OneTrustGroupsUpdated` is triggered their cookie
  // is still missing the groups in the value, by intervaling the check we can look at the cookie value
  // after OneTrustGroupsUpdated has been triggered
  useEffect(() => {
    const interval = setInterval(() => {
      const oneTrustCookie = cookies.get ? cookies.get("OptanonConsent") : undefined;
      if (!oneTrustCookie || !oneTrustCookie.includes("groups=")) {
        return;
      }
      clearInterval(interval);
      if (oneTrustCookie && oneTrustCookie.includes("C0004:1") && setTargetingCookieConsent) {
        setTargetingCookieConsent(true);
      }
      if (oneTrustCookie && oneTrustCookie.includes("C0002:1") && setPerformanceCookieConsent) {
        setPerformanceCookieConsent(true);
      }
    }, 500);
    return () => clearInterval(interval);
  });

  useEffect(() => {
    window.addEventListener("OneTrustGroupsUpdated", () => {
      const oneTrustCookie = cookies.get("OptanonConsent");
      const performanceCookieConsent = performanceCookieConsentRef.current;

      const cookieParams = new URLSearchParams(oneTrustCookie ?? "");
      const interactionCount = parseInt(cookieParams.get("interactionCount"));
      if (interactionCounterRef.current === null && !isNaN(interactionCount)) {
        interactionCounterRef.current = interactionCount;
      }
      if (oneTrustCookie && oneTrustCookie.includes("C0002:1") && setPerformanceCookieConsent) {
        setPerformanceCookieConsent(true);
        if (
          !performanceCookieConsent &&
          interactionCounterRef.current !== null &&
          interactionCount > interactionCounterRef.current
        ) {
          window.location.reload();
        }
      }

      if (oneTrustCookie && oneTrustCookie.includes("C0004:1") && setTargetingCookieConsent) {
        setTargetingCookieConsent(true);
      }

      if (oneTrustCookie && oneTrustCookie.includes("C0003:1") && setFunctionalCookieConsent) {
        setFunctionalCookieConsent(true);
      }

      if (
        oneTrustCookie &&
        (oneTrustCookie.includes("C0002:0") ||
          oneTrustCookie.includes("C0004:0") ||
          oneTrustCookie.includes("C0003:0") ||
          oneTrustCookie.includes("C0005:0"))
      ) {
        LocalStorageWrapper.clear();
        LocalStorageWrapper.disable("localstorage blocked, see cookie preferences");
        if (
          performanceCookieConsent &&
          interactionCounterRef.current !== null &&
          interactionCount > interactionCounterRef.current
        ) {
          console.info("rr");
          window.location.reload();
        }
      }
    });
  }, [setPerformanceCookieConsent, setTargetingCookieConsent, setFunctionalCookieConsent]);

  const otId = "488d15e8-5436-4ecc-b202-0d14fac3afe8";
  const id = isProduction() ? otId : `${otId}-test`;

  return (
    <>
      {
        <Helmet>
          <script
            type="text/javascript"
            crossOrigin="anonymous"
            src={`https://cdn.cookielaw.org/consent/${id}/OtAutoBlock.js`}
          ></script>
          <script
            src="https://cdn.cookielaw.org/scripttemplates/otSDKStub.js"
            data-document-language="true"
            type="text/javascript"
            crossOrigin="anonymous"
            // charset="UTF-8"
            data-domain-script={id}
          ></script>
          <script type="text/javascript">{`function OptanonWrapper() {
            const event = new Event('OneTrustGroupsUpdated');
            window.dispatchEvent(event);
            const url = (window && window.location) ? window.location.search : null;
            const params = new URLSearchParams(url);
            const noTrackQueryParam = params.get("noTrack") === "true";
            if (noTrackQueryParam) {
              if (OneTrust.IsAlertBoxClosed() === false) {
                var banner = document.getElementById("onetrust-banner-sdk");
                var filter = document.getElementsByClassName("onetrust-pc-dark-filter")[0];
                banner.style = "display: none;";
                filter.style = "display: none !important;";
                OneTrust.RejectAll();
              }
            }
          }`}</script>
        </Helmet>
      }
    </>
  );
};

export default OneTrustScript;
