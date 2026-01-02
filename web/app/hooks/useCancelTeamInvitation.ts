import { useMutation, useQueryClient } from "@tanstack/react-query";
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

export function useCancelTeamInvitation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (invitationId: number) => {
      const token = getAccessToken();
      await axios.delete(
        `${basePath}/api/team/invitations/${invitationId}`,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team-invitations"] });
    },
  });
}

