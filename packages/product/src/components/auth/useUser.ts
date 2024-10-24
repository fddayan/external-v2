import { useSession } from "./useSession";

export const useUser = () => useSession()?.userData;
