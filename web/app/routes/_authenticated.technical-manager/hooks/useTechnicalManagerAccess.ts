import { useUser } from "~/hooks/useUser";
import { useRoleBasedRedirect } from "~/hooks/useRoleBasedRedirect";

export function useTechnicalManagerAccess() {
  const { data: user, isLoading: userLoading, error: userError } = useUser();
  
  useRoleBasedRedirect(user, userLoading, userError, "TECHNICAL_MANAGER");

  return {
    user,
    userLoading,
    error: userError,
    isTechnicalManager: user?.role === "TECHNICAL_MANAGER",
  };
}

