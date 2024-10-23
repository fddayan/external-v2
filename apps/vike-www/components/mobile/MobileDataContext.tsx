import React, { useCallback, useEffect, useState } from "react";
import Axios from "axios";
import { useGetSessionIdSync, init, setEntityType, setFeatureSetId, setFeatureSwitches } from "@src/utils/logClient";
import { APIDomain } from "@src/utils/APIDomain";
import { defaultFSValues, LiteSwitches } from "@src/utils/experiments/constants";
import { checkRedirect } from "@src/utils/routes";
import cookies from "cookies-js";
import { isProduction } from "@src/utils/env";
import { FEATURE_SWITCH_ID } from "@src/utils/cookies";

type User = {
  _id: string;
  username: string;
  type: "student" | "parent" | "teacher";
  countryCode: string;
  schoolId?: string;
  locale?: string;
};
type MobileData = {
  user?: User;
  locale?: string;
  featureFlags: Record<string, string>;
  featureFlagsLoaded: boolean;
};
export type MobileDataContextProps = { data: MobileData; set: (arg0: MobileData) => void };

const defaultContextValue: { data: MobileData; set: () => void } = {
  data: { user: undefined, featureFlags: {}, featureFlagsLoaded: false },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  set: () => {},
};

const logClientInitiated = false;
export const initLiteLogClient = () => {
  if (!logClientInitiated) {
    if (process.env.GATSBY_ENV === "development") {
      init({
        site: "lite",
        env: "dev",
        customEndpoint: "/logs",
        productArea: "external",
      });
    } else {
      init({
        site: "lite",
        env: "prod",
        customEndpoint: "/logs",
        buildNumber: `${process.env.GATSBY_BUILD_NUMBER}-${process.env.GATSBY_GIT_COMMIT}`,
        productArea: "external",
      });
    }
  }
};

const MobileDataContext = React.createContext<MobileDataContextProps>(defaultContextValue);

const MobileDataContextProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<MobileDataContextProps["data"]>(defaultContextValue.data);
  const updateData = (data: Partial<MobileData>) => {
    setData((oldData) => ({
      ...oldData,
      ...data,
    }));
  };
  const getSession = () => {
    const SESSION = `${APIDomain}/api/session`;
    Axios.get(SESSION, { withCredentials: true })
      .then((response) => {
        const newData = { user: response.data as User };
        setEntityType({});
        setData((prevData) => ({
          ...prevData,
          ...newData,
        }));
      })
      .catch((error) => {
        setEntityType({});
        console.log(error);
      })
      .finally(() => {
        getFeatureFlags();
      });
  };

  const loggingClientSessionId = useGetSessionIdSync();
  const getFeatureFlags = useCallback(async () => {
    const locale = cookies.get("dojoDesiredLanguage") || "en-us";
    updateData({ locale });
    if (isProduction()) {
      const shouldSkipFSFetching =
        !navigator.cookieEnabled || !loggingClientSessionId || loggingClientSessionId === "redacted";
      if (shouldSkipFSFetching) {
        setFeatureSwitches(defaultFSValues);
        return;
      }
    }

    const cookieKey = FEATURE_SWITCH_ID;
    const flagId = cookies.get(cookieKey);

    const fsParams = () => {
      const sessionSwitches = Object.values(LiteSwitches).join(",");

      const loggedOutParams = {
        sessionId: loggingClientSessionId,
        sessionSwitches: sessionSwitches,
        sessionLocale: locale,
      };
      return loggedOutParams;
    };

    const params = new URLSearchParams({ ...fsParams(), featureSetId: flagId });
    const flagUrl = `/api/featureSwitch?${params.toString()}`;

    try {
      const result = await Axios.get(flagUrl);
      const featureSetId = result.data.featureSetId;
      if (featureSetId) {
        setFeatureSetId(featureSetId);
      }
      const fs = Object.values(result.data).reduce((acc: Record<string, string>, fsData) => {
        if (typeof fsData === "object") {
          return { ...acc, ...fsData };
        }
        return acc;
      }, {}) as Record<string, string>;
      setFeatureSwitches(fs);
      updateData({ featureFlags: fs, featureFlagsLoaded: true });
    } catch (e) {
      console.error(e);
    }
  }, [loggingClientSessionId]);

  useEffect(() => {
    getSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (process.env.GATSBY_BUILD_WEBSITE === "mobile") {
      checkRedirect("mobile"); //redirect to desired locale
    }
  }, []);

  const contextValue: MobileDataContextProps = {
    data,
    set: setData,
  };

  return <MobileDataContext.Provider value={contextValue}>{children}</MobileDataContext.Provider>;
};

export { MobileDataContext, MobileDataContextProvider };
