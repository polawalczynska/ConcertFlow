import { useUser } from "~/shared/hooks/domain";

export function useBudgetManagerAccess() {
  const { data: user, isLoading: userLoading, error: userError } = useUser();

  return {
    user,
    userLoading,
    error: userError,
    isBudgetManager: user?.role === "BUDGET_MANAGER",
  };
}

