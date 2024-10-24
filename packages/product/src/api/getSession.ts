import { AxiosResponse } from "axios";
import { axios } from "./axios";

export const SESSION = `/api/session`;

type SchoolwideCenter = {
  isHoldoutSchool: boolean;
  interestExpressedBy: string[];
  directoryComplete: boolean;
  decision: string;
};

export type EntityType = "teacher" | "parent" | "student";

export type SessionData = {
  // loadingSession?: boolean;
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

export const getSession = async () => {
  const response = await axios.get(SESSION, { withCredentials: true });

  const data: Partial<SessionData> = { fromUS: isFromUs(response.headers) };
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
      data.name = userData.student.firstName
        ? escapeHtml(userData.student.firstName)
        : "";
    }
  }

  return data;
};

const entityMap: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
  "/": "&#x2F;",
};

const isFromUs = function (headers: AxiosResponse["headers"]) {
  const header = headers["x-usa"] || headers["X-USA"];
  return Boolean(header) && Number(header) === 1;
};

const escapeHtml = function (str: string) {
  // eslint-disable-next-line no-useless-escape
  return String(str).replace(/[&<>"'\/]/g, function (s) {
    return entityMap[s];
  });
};
