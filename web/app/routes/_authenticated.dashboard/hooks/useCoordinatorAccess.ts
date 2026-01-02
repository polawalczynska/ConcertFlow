import { useUser } from "~/hooks/useUser";
import { useRoleBasedRedirect } from "~/hooks/useRoleBasedRedirect";

export function useCoordinatorAccess() {
  const { data: user, isLoading: userLoading, error: userError } = useUser();
  
  useRoleBasedRedirect(user, userLoading, userError, "COORDINATOR");

  return {
    user,
    userLoading,
    error: userError,
    isCoordinator: user?.role === "COORDINATOR",
  };
}

