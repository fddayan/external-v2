import axios from "@src/utils/requests/axiosInstance";
type EmailValidationCode = {
  isAvailableForSignUp: boolean;
  errorType?: "invalid_format" | "user_exists" | "excluded_email" | undefined;
  entityType?: "teacher" | "parent" | "student" | undefined;
  isPasswordless?: boolean | undefined;
  oidcProviders?: {
    slug: string;
    isLinked: boolean;
    isPreferred: boolean;
  }[];
};

export const validateEmail = async ({ email }: { email: string }): Promise<EmailValidationCode | null> => {
  try {
    const { data } = await axios.get(`/api/user/emailValidation/${email}`);

    return data as EmailValidationCode;
  } catch (ex: unknown) {
    return null;
  }
};

export const sendOneTimeCode = async ({ email }: { email: string }) => {
  try {
    const { data } = await axios.post(`/api/oneTimeCode`, { email });

    return data;
  } catch (err) {
    if (err.response.status === 400 || err.response.status === 404 || err.response.status === 429) {
      return err;
    }

    throw err;
  }
};
