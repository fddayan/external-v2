import { useAuth } from "./useAuth";

export const useSession = () => useAuth()?.session;
