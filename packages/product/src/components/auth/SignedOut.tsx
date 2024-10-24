import { ReactNode } from "react";
import { useAuth } from "./useAuth";

export const SignedOut = ({ children }: { children: ReactNode }) => {
  const data = useAuth();

  if (data?.session?.userData) return null;

  return children;
};
