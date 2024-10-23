import React, { useCallback, useEffect, useRef, useState } from "react";
import { AxiosResponse } from "axios";
import Axios from "@src/utils/requests/axiosInstance";
import {
  getSessionId,
  useGetSessionIdSync,
  init,
  logEvent,
  logException,
  logMessage,
  setEntityId,
  setFeatureSetId,
  setFeatureSwitches,
  setEntityType,
} from "@src/utils/logClient";
import { checkRedirect } from "@src/utils/routes";
import cookies from "cookies-js";
import getClasses from "@src/services/ideas/getClasses";
import shareToClassStory from "@src/services/ideas/shareToClassStory";
import applyToBeMentor from "@src/services/applyToBeMentor";
import window from "global/window";
import { FEATURE_SWITCH_ID } from "@src/utils/cookies";
import { EntityType } from "@src/utils/getSubdomainURL";
import { logMarketingPageview } from "@src/utils/logMarketingPageview";
import { ExternalSwitches, TeacherSwitches, defaultFSValues } from "@src/utils/experiments/constants";
import { isProduction } from "@src/utils/env";

const entityMap: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
  "/": "&#x2F;",
};

const escapeHtml = function (str: string) {
  // eslint-disable-next-line no-useless-escape
  return String(str).replace(/[&<>"'\/]/g, function (s) {
    return entityMap[s];
  });
};

const isFromUs = function (headers: Record<string, string>) {
  const header = headers["x-usa"] || headers["X-USA"];
  return Boolean(header) && Number(header) === 1;
};

const isBadParentCodePath = (path: string) =>
  /^[pP]{1}.+/.test(path) && path !== "proudtoteach" && path !== "privacy" && path !== "playvideo";

const formatAndLogException = async function (msg: string, url: string, lineNo: string, colNo: string, error: any) {
  let context;
  if (errorShouldBeWarn(msg, error)) {
    if (window.isBrowserSupported === false) msg = `[UNSUPPORTED BROWSER] ${msg}`;

    await logMessage("warn", msg);
  } else {
    if (!url || /classdojo/gi.test(url)) {
      context = "script: " + url + ", lineNo: " + lineNo + ", colNo: " + colNo;
      if (!error) {
        error = {
          message: msg,
          status: "unknown",
          method: "unknown",
          url: url,
          stack: context,
        };
      }
      await logException(error, context);
    }
  }
};

const errorShouldBeWarn = (msg: string, error: { stack?: string }) => {
  const msgString = `${msg}`.toLowerCase();
  const scriptError = "script error";
  const stack = error && error.stack ? error.stack : "";
  return (
    msgString.indexOf(scriptError) > -1 ||
    msgString.indexOf("classlist") > -1 ||
    stack.indexOf("cookielaw") > -1 ||
    window.__CD_UNSUPPORTED_BROWSER
  );
};

const setOnError = () => {
  window.onerror = formatAndLogException;
  window.addEventListener("unhandledrejection", function (event) {
    if (event.isTrusted) {
      formatAndLogException(event.reason.message, "", "", "", event.reason);
    }
  });
};

type UserData = AppData["userData"];

// Log client needs to be initialized when this file is imported for the first time
// this function it's supposed to run only once and doing it outside the component
// should prevent errors about unitialized client
let logClientInitiated = false;
export const initLogClient = () => {
  if (!logClientInitiated) {
    let site = process.env.GATSBY_BUILD_WEBSITE;
    if (process.env.GATSBY_BUILD_WEBSITE === "www") {
      site = "external";
    } else if (process.env.GATSBY_BUILD_WEBSITE === "ideas") {
      site = "external-ideas";
    }
    if (process.env.GATSBY_ENV === "development") {
      init({
        site,
        env: "dev",
        customEndpoint: "/logs",
        productArea: "external",
      }).then(() => {
        logClientInitiated = true;
      });
    } else {
      init({
        site,
        env: "prod",
        customEndpoint: "/logs",
        buildNumber: `${process.env.GATSBY_BUILD_NUMBER}-${process.env.GATSBY_GIT_COMMIT}`,
        productArea: "external",
      }).then(() => {
        logClientInitiated = true;
      });
    }
  }
};

type SchoolwideCenter = {
  isHoldoutSchool: boolean;
  interestExpressedBy: string[];
  directoryComplete: boolean;
  decision: string;
};

type AppData = {
  loadingSession?: boolean;
  loadedSchoolwideCenter?: boolean;
  locale?: string;
  type?: EntityType;
  fromUS?: boolean;
  needsDataTransferConsent?: boolean;
  geolocation: {
    state: string;
  };
  userData?: {
    type: EntityType | undefined;
    firstName: string;
    _id: string;
    lastName: string;
    emailAddress: string;
    avatarURL: string;
    title: string;
    role: "teacher" | "parent" | "student";
    schoolId: string;
    isSchoolAdmin: boolean;
    countryCode?: string;
    locale?: string;
    [key: string]: unknown;
  };
  schoolwideCenter: SchoolwideCenter | Record<string, never>;
  name?: string;
  classes: Array<any>;
  shareStatus: Record<string, "pending" | "done" | "error">;
  featureFlags: any;
  featureFlagsLoaded: boolean;
  mentorApplicationEligibility: any;
  logClientInitiated: boolean;
  cookieConsent: {
    performanceCookieConsent: boolean;
    trackingCookieConsent: boolean;
    functionalCookieConsent: boolean;
  };
};
type AppDataContextProps = {
  children: JSX.Element;
  performanceCookieConsent?: boolean;
  targetingCookieConsent?: boolean;
  functionalCookieConsent?: boolean;
};
type AppDataServices = {
  logout: () => Promise<void>;
  getSession: () => Promise<void>;
  getClasses: () => Promise<void>;
  shareToClassStory: (classId: string, body: string, image: string) => Promise<void>;
  getMentorApplicationEligibility: () => Promise<void>;
  applyToBeMentor: (props: any) => Promise<void>;
  getSchoolwideCenter: (schoolId: string) => void;
};
export type AppDataContextType = {
  data: AppData;
  services: AppDataServices;
  set: (data: AppData) => void;
};

const defaultContextValue: AppDataContextType = {
  data: {
    geolocation: {
      state: "",
    },
    loadingSession: true,
    type: undefined,
    fromUS: undefined,
    needsDataTransferConsent: true,
    userData: undefined,
    featureFlags: {},
    shareStatus: {},
    classes: [],
    featureFlagsLoaded: false,
    mentorApplicationEligibility: false,
    logClientInitiated: false,
    locale: undefined,
    loadedSchoolwideCenter: false,
    schoolwideCenter: {},
    cookieConsent: {
      performanceCookieConsent: false,
      trackingCookieConsent: false,
      functionalCookieConsent: false,
    },
  },
  services: {
    async logout() {
      return;
    },
    async getSession() {
      return;
    },
    async getMentorApplicationEligibility() {
      return;
    },
    async shareToClassStory() {
      return;
    },
    async applyToBeMentor() {
      return;
    },
    async getClasses() {
      return;
    },
    async getSchoolwideCenter() {
      return;
    },
  },
  set: () => null,
};

const AppDataContext = React.createContext<AppDataContextType>(defaultContextValue);

const AppDataContextProvider = ({
  children,
  performanceCookieConsent,
  targetingCookieConsent,
  functionalCookieConsent,
}: AppDataContextProps) => {
  const [data, setData] = useState<AppDataContextType["data"]>({
    ...defaultContextValue.data,
    logClientInitiated,
  });
  const updateData = (data: Partial<AppDataContextType["data"]>) => {
    setData((oldData) => ({
      ...oldData,
      ...data,
    }));
  };

  const getGeolocation = useCallback(async (): Promise<void> => {
    const resp: AxiosResponse = await Axios.get("/api/location");
    const geolocationData = resp.data;
    updateData({ geolocation: geolocationData });
  }, []);

  const getSession = useCallback(async (): Promise<void> => {
    const SESSION = `/api/session`;
    return Axios.get(SESSION, { withCredentials: true })
      .then((response) => {
        const data: Partial<AppData> = { fromUS: isFromUs(response.headers) };
        const userData = response.data || {};
        if ("type" in userData) {
          data.type = userData.type;
          if (userData.type === "teacher") {
            data.userData = userData.teacher;
            data.name = escapeHtml(userData.teacher.firstName);
          } else if (userData.type === "parent") {
            data.userData = userData.parent;
            data.name = escapeHtml(userData.parent.firstName);
          } else if (userData.student) {
            data.userData = userData.student;
            data.name = userData.student.firstName ? escapeHtml(userData.student.firstName) : "";
          }
        }
        if (data.userData) data.userData.type = data.type;
        updateData(data);

        const entity = userData.teacher || userData.parent || userData.student;
        setEntityType(userData);
        setEntityId(entity._id);

        if (window._paq && entity._id) window._paq.push(["setUserId", entity._id as string]);
      })
      .catch((error) => {
        setEntityType({});
        // if (error && !isProduction()) throw error;
        updateData({ fromUS: error.response ? isFromUs(error.response.headers) : false });
      })
      .finally(() => {
        updateData({ loadingSession: false });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getNeedsDataTransferConsent = useCallback(async (): Promise<void> => {
    return Axios.get("/api/needsDataTransferConsent")
      .then((response) => {
        updateData({
          needsDataTransferConsent: response.data.needsDataTransferConsent,
        });
      })
      .catch((error) => {
        console.error(
          `Failed getting needsDataTransferConsent value to determine users need to provide consent on signup: ${error}`,
        );
      });
  }, []);

  const getContextClasses = useCallback(async () => {
    try {
      const result = await getClasses();
      updateData({
        classes: result,
      });
    } catch (e) {
      console.error("Failed getting classes");
    }
  }, []);

  const loggedUserVisitRef = useRef(false);
  useEffect(() => {
    if (data.userData?.type && !loggedUserVisitRef.current) {
      const routeName = window.location.pathname.slice(1).split("/").shift() || "index";
      if (isBadParentCodePath(routeName)) logEvent("user_visit:bad_parent_code_path");
      else logEvent(`user_visit:${routeName}`);
      loggedUserVisitRef.current = true;
    }
  }, [data.userData]);

  const loggingClientSessionId = useGetSessionIdSync();
  const getFeatureFlags = useCallback(
    async ({ userData }: { userData?: UserData }) => {
      const locale = cookies.get("dojoDesiredLanguage") || "en-us";
      updateData({ locale });
      if (isProduction()) {
        const shouldSkipFSFetching =
          !navigator.cookieEnabled ||
          !performanceCookieConsent ||
          !loggingClientSessionId ||
          loggingClientSessionId === "redacted";
        if (shouldSkipFSFetching) {
          setFeatureSwitches(defaultFSValues);
          return;
        }
      }

      const cookieKey = FEATURE_SWITCH_ID;
      const flagId = cookies.get(cookieKey);

      const fsParams = (type: EntityType | "loggedOut") => {
        const sessionSwitches = Object.values(ExternalSwitches).join(",");

        const loggedOutParams = {
          sessionId: loggingClientSessionId,
          sessionSwitches: sessionSwitches,
          sessionLocale: locale,
        };
        switch (type) {
          case "teacher": {
            const teacherSwitches = Object.values(TeacherSwitches) as string[];
            if (!teacherSwitches.length) {
              return loggedOutParams;
            }
            return {
              teacherId: userData._id,
              teacherCountryCode: userData.countryCode || "us",
              schoolId: userData.schoolId,
              teacherLocale: userData.locale || "en-us",
              teacherSwitches: teacherSwitches.join(","),
              schoolSwitches: "",
              ...loggedOutParams,
            };
          }
          default:
            return loggedOutParams;
        }
      };

      const params = new URLSearchParams({ ...fsParams(userData?.type || "loggedOut"), featureSetId: flagId });
      const flagUrl = `/api/featureSwitch?${params.toString()}`;

      try {
        const result = await Axios.get(flagUrl);
        const featureSetId = result.data.featureSetId;
        if (featureSetId) {
          setFeatureSetId(featureSetId);
        }
        const fs = Object.values(result.data).reduce((acc, fsData) => {
          if (typeof fsData === "object") {
            return { ...(acc as Record<string, string>), ...fsData };
          }
          return acc;
        }, {});
        setFeatureSwitches(fs);
        updateData({ featureFlags: fs, featureFlagsLoaded: true });
      } catch (e) {
        console.error(e);
      }
    },
    [loggingClientSessionId, performanceCookieConsent],
  );

  useEffect(() => {
    updateData({
      cookieConsent: {
        performanceCookieConsent: performanceCookieConsent,
        trackingCookieConsent: targetingCookieConsent,
        functionalCookieConsent: functionalCookieConsent,
      },
    });
  }, [performanceCookieConsent, targetingCookieConsent, functionalCookieConsent]);

  useEffect(() => {
    if (!data.loadingSession) {
      getFeatureFlags({ userData: data.userData });
    }
  }, [getFeatureFlags, data.loadingSession, data.userData, data.type]);

  useEffect(() => {
    if (process.env.GATSBY_BUILD_WEBSITE === "www" || process.env.GATSBY_BUILD_WEBSITE === "ideas") {
      checkRedirect(process.env.GATSBY_BUILD_WEBSITE); //redirect to desired locale
    }

    setOnError();
    (window.errorCache || []).forEach((errorArgs: [string, string, string, string, any]) => {
      formatAndLogException(...errorArgs);
    });

    if (typeof window !== "undefined") {
      getSessionId().then((sessionId) => ((window as any).sessionId = sessionId));
    }

    getNeedsDataTransferConsent();
    getGeolocation();

    getSession().finally(() => {
      if (process.env.GATSBY_BUILD_WEBSITE === "ideas") {
        getContextClasses();
      }
      logMarketingPageview(window.location);
    });
    if (process.env.GATSBY_BUILD_WEBSITE === "www" || process.env.GATSBY_BUILD_WEBSITE === "ideas") {
      checkRedirect(process.env.GATSBY_BUILD_WEBSITE); //redirect to desired locale
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getContextClasses, getNeedsDataTransferConsent, getSession]);

  const getMentorApplicationEligibility = async (): Promise<AxiosResponse["data"]> => {
    const SESSION = `/api/mentorApplicationEligibility`;
    return Axios.get(SESSION, { withCredentials: true }).then((response) => {
      return response.data || {};
    });
  };

  const getSchoolwideCenter = async (schoolId: string): Promise<AxiosResponse["data"]> => {
    const url = `/api/dojoSchool/${schoolId}/schoolwideCenterTeacher`;
    return Axios.get(url, { withCredentials: true })
      .then((response) => {
        return response.data || {};
      })
      .finally(() => {
        updateData({ loadedSchoolwideCenter: true });
      });
  };

  return (
    <AppDataContext.Provider
      value={{
        data,
        set: updateData,
        services: {
          logout: async () => {
            const SESSION = `/api/session`;
            await Axios.delete(SESSION, { withCredentials: true }).then(() => {
              updateData({
                userData: undefined,
                loadingSession: false,
                type: undefined,
                fromUS: undefined,
                classes: [],
                shareStatus: {},
              });
            });
          },
          getClasses: getContextClasses,
          getSchoolwideCenter: async (schoolId: string) => {
            try {
              const data = await getSchoolwideCenter(schoolId);
              updateData({
                schoolwideCenter: data,
              });
              return data;
            } catch (error) {
              console.error("Failed getting Schoolwide Center data");
            }
          },
          getSession: async () => {
            return getSession().finally(() => {
              if (process.env.GATSBY_BUILD_WEBSITE === "ideas") {
                getContextClasses();
              }
            });
          },
          getMentorApplicationEligibility: async () => {
            try {
              const result = await getMentorApplicationEligibility();
              updateData({
                mentorApplicationEligibility: result,
              });
            } catch (e) {
              console.error("Failed getting mentor application eligibility");
            }
          },
          shareToClassStory: async (classId, body, image) => {
            updateData({
              shareStatus: Object.assign({}, data.shareStatus, { [classId]: "pending" }),
            });
            return shareToClassStory(classId, body, image)
              .then(() => {
                updateData({
                  shareStatus: Object.assign({}, data.shareStatus, { [classId]: "done" }),
                });
              })
              .catch(() => {
                updateData({
                  shareStatus: Object.assign({}, data.shareStatus, { [classId]: "error" }),
                });
              });
          },
          applyToBeMentor: async (application) => {
            return applyToBeMentor(application).then(() => {
              updateData({
                mentorApplicationEligibility: { applied: true },
              });
            });
          },
        },
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
};

export { AppDataContext, AppDataContextProvider };
