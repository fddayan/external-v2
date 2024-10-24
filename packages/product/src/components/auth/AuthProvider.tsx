import { createContext } from "react";
import { useGetSession } from "../../hooks/useGetSession";
import { SessionData } from "../../api/getSession";

export interface AuthContextProps {
  session: Partial<SessionData> | undefined;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextProps | null>(null);

export interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { data: session, isLoading } = useGetSession();

  return (
    <AuthContext.Provider value={{ session, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
