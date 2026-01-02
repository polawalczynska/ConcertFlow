import { useEffect } from "react";
import { useNavigate } from "@remix-run/react";
import { useUser } from "~/hooks/useUser";

export function useBudgetManagerAccess() {
  const navigate = useNavigate();
  const { data: user, isLoading: userLoading, error: userError } = useUser();

  useEffect(() => {
    if (!userLoading) {
      if (userError || !user) {
        return;
      }
      if (user.role !== "BUDGET_MANAGER") {
        if (user.role === "COORDINATOR") {
          navigate("/manage", { replace: true });
        } else if (user.role === "TECHNICAL_MANAGER") {
          navigate("/technical-dashboard", { replace: true });
        } else {
          navigate("/dashboard", { replace: true });
        }
      }
    }
  }, [user, userLoading, userError, navigate]);

  return {
    user,
    userLoading,
    error: userError,
    isBudgetManager: user?.role === "BUDGET_MANAGER",
  };
}

