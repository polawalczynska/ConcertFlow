import { useUser } from "~/shared/hooks/domain";

export function useTechnicalManagerAccess() {
  const { data: user, isLoading: userLoading, error: userError } = useUser();

  return {
    user,
    userLoading,
    error: userError,
    isTechnicalManager: user?.role === "TECHNICAL_MANAGER",
  };
}

