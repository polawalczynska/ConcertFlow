import { useQuery } from "@tanstack/react-query";
import { useUser } from "~/hooks/useUser";
import axios from "axios";
import { getAccessToken } from "~/lib/token-storage";

interface WindowWithEnv extends Window {
  ENV?: {
    API_BASE_URL?: string;
  };
}

const basePath = typeof window !== "undefined" 
  ? (window as unknown as WindowWithEnv).ENV?.API_BASE_URL || "http://localhost:8080"
  : "http://localhost:8080";

export function useCheckTeamMembership() {
  const { data: currentUser } = useUser();
  
  return useQuery<boolean>({
    queryKey: ["team-membership", currentUser?.id],
    queryFn: async () => {
      if (!currentUser?.id) return false;
      const token = getAccessToken();
      const response = await axios.get<boolean>(
        `${basePath}/api/team/check-membership`,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );
      return response.data;
    },
    enabled: !!currentUser?.id && currentUser?.role !== "COORDINATOR",
    staleTime: 30 * 1000,
  });
}

