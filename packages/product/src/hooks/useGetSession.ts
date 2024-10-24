import { useQuery } from "@tanstack/react-query";
import { getSession } from "../api/getSession";

export const useGetSession = () => {
  return useQuery({
    queryKey: ["session"],
    queryFn: getSession,
  });
};
