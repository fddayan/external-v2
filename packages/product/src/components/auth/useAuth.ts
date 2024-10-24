import { useContext } from "react";
import { AuthContext } from "./AuthProvider";

export const useAuth = () => {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error("AuthProvider not found");
  }

  return value;
};
