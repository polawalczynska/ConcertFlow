import { useUser } from "~/hooks/useUser";
import { useRoleBasedRedirect } from "~/hooks/useRoleBasedRedirect";

export function useBudgetManagerAccess() {
  const { data: user, isLoading: userLoading, error: userError } = useUser();
  
  useRoleBasedRedirect(user, userLoading, userError, "BUDGET_MANAGER");

  return {
    user,
    userLoading,
    error: userError,
    isBudgetManager: user?.role === "BUDGET_MANAGER",
  };
}

