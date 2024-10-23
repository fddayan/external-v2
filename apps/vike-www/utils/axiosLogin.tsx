import axios from "./requests/axiosInstance";
import { setEntityId, logEvent, setEntityType } from "@src/utils/logClient";

export const login = async ({
  login,
  longSession,
  password,
  userType,
  code,
}: {
  login: string;
  password: string;
  longSession: boolean;
  userType: "parent" | "teacher" | "leader";
  code?: string;
}) => {
  const baseUrl =
    process.env.GATSBY_BUILD_WEBSITE === "ideas"
      ? process.env.GATSBY_IDEAS_API_URL
      : process.env.GATSBY_TEACHER_LOGIN_URL;
  const url = `${baseUrl}/api/session?duration=${longSession ? "long" : "short"}`;
  try {
    const response = await axios.post(
      url,
      {
        login,
        password,
        code,
        resumeAddClassFlow: !code ? !!window?.location?.href?.match(/\/connect/) : undefined,
      },
      {
        withCredentials: true,
      },
    );

    const { data } = response;
    const entity = data.teacher || data.parent || data.student;
    if (entity) {
      setEntityId(entity._id);
      setEntityType(data);
    }
    logEvent({
      eventName: "web.login.success",
      entityId: entity?._id,
      metadata: {
        current_site: "external",
        account_type: data.type,
      },
    });

    return response;
  } catch (e) {
    logEvent({
      eventName: "web.login.failure",
      metadata: {
        current_site: "external",
        account_type: userType,
      },
    });
    throw e;
  }
};
