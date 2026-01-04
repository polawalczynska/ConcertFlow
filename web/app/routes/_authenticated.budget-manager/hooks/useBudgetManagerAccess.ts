import { useUser } from "~/hooks/useUser";

export function useBudgetManagerAccess() {
  const { data: user, isLoading: userLoading, error: userError } = useUser();

  return {
    user,
    userLoading,
    error: userError,
    isBudgetManager: user?.role === "BUDGET_MANAGER",
  };
}

