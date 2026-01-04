import { useUser } from "~/hooks/useUser";

export function useTechnicalManagerAccess() {
  const { data: user, isLoading: userLoading, error: userError } = useUser();

  return {
    user,
    userLoading,
    error: userError,
    isTechnicalManager: user?.role === "TECHNICAL_MANAGER",
  };
}

