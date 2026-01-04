import { useUser } from "~/hooks/useUser";

export function useCoordinatorAccess() {
  const { data: user, isLoading: userLoading, error: userError } = useUser();

  return {
    user,
    userLoading,
    error: userError,
    isCoordinator: user?.role === "COORDINATOR",
  };
}

