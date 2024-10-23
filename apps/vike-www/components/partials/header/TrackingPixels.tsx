import React, { useEffect } from "react";
import cookies from "cookies-js";
import { cookiesWork } from "@src/utils/cookies";
import { useLocation } from "@reach/router";
import { LocalStorageWrapper } from "@src/utils/localStorage";
import window from "global/window";
// import { GTagScript, MetaScript, PinterestScript, TikTokScript } from "@src/utils/TrackingScripts";

const urlsWithExternalTracking = [
  "/",
  "/schools",
  "/teachers",
  "/schoolleaders",
  "/resources",
  "/privacy",
  "/terms",
  "/about",
  "/points",
  "/training",
  "/privacycenter",
  "/activity-corner",
  "/schoolleader",
];

type TrackingPixelsProps = {
  targetingCookieConsent: boolean;
};
const TrackingPixels: React.FC<TrackingPixelsProps> = ({ targetingCookieConsent }) => {
  const searchParams = useLocation().search;
  const referrer = window.document ? window.document.referrer : null;
  const sessionIdCookie = cookiesWork() ? cookies.get("dojo_log_session_id") : null;
  const paramsEntries = new URLSearchParams(searchParams);
  const paramsAsObject = Object.fromEntries(paramsEntries);
  const initReferrerObjectInLocalStorage = LocalStorageWrapper.getItem("init-referrer-data");
  const lastReferrerObjectInLocalStorage = LocalStorageWrapper.getItem("last-referrer-data");

  function writeReferralData(localStorageKey: string) {
    const referrerObject = { sessionIdCookie: sessionIdCookie, ...paramsAsObject, referrerUrl: referrer };
    const referrerObjectAsString = JSON.stringify(referrerObject);
    LocalStorageWrapper.setItem(localStorageKey, referrerObjectAsString);
  }

  useEffect(() => {
    if (sessionIdCookie) {
      if (!initReferrerObjectInLocalStorage) {
        writeReferralData("init-referrer-data");
      }

      if (
        initReferrerObjectInLocalStorage &&
        sessionIdCookie !== JSON.parse(initReferrerObjectInLocalStorage).sessionIdCookie
      ) {
        writeReferralData("last-referrer-data");
      } else if (
        lastReferrerObjectInLocalStorage &&
        sessionIdCookie !== JSON.parse(lastReferrerObjectInLocalStorage).sessionIdCookie
      ) {
        LocalStorageWrapper.removeItem("last-referrer-data");
        writeReferralData("last-referrer-data");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionIdCookie]);

  useEffect(() => {
    if (!cookiesWork()) return;
    if (!targetingCookieConsent) return;

    const params = new URLSearchParams(searchParams);
    const campaign = params.get("utm_campaign");
    const source = params.get("utm_source");
    const medium = params.get("utm_medium");

    if (!cookies.get("attribution") && campaign && source) {
      cookies.set("attribution", source);
    }

    if (medium === "cpc" && campaign && source) {
      cookies.set("paid_attribution", `campaign=${campaign}&source=${source}`, { expires: 2592000 });
    }
  }, [targetingCookieConsent]);

  return null;
};

export default TrackingPixels;
