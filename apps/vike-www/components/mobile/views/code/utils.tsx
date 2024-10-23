import axios from "axios";
import { navigate } from "gatsby";
import navToError from "@src/utils/navToError";
const UNKNOWN_SRC = "digitalSignupLink";

function getDefaultApiEndpoint(): string {
  const { GATSBY_ENV } = process.env;
  const isProd = GATSBY_ENV === "production";
  return isProd ? "https://lite.classdojo.com" : "";
}

async function checkAlreadyLoggedinParent(
  data: { user?: { type: "student" | "parent" | "teacher" } } | undefined,
  code: string,
) {
  if (data?.user?.type === "parent") {
    try {
      await axios.post(`${getDefaultApiEndpoint()}/api/invitation/${code}`);
      navigate(`/sc/${code}/parentDone`);
    } catch (err: any) {
      if (err?.response?.status === 400) {
        navigate(`/sc/${code}/parentDone/alreadyConnected`);
      } else {
        navToError(err);
      }
    }
  }
}
async function checkAlreadyLoggedinStudent(
  data: { user?: { type: "student" | "parent" | "teacher" } } | undefined,
  code: string,
) {
  if (data?.user?.type === "student") {
    try {
      await axios.post(`${getDefaultApiEndpoint()}/api/invitation/${code}`);
      navigate(`/sc/${code}/studentDone`);
    } catch (err: any) {
      if (err?.response?.status === 400) {
        navigate(`/sc/${code}/studentDone`);
      } else {
        navToError(err);
      }
    }
  }
}

export { checkAlreadyLoggedinParent, checkAlreadyLoggedinStudent, getDefaultApiEndpoint, UNKNOWN_SRC };
