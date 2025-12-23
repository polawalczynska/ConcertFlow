import { useEffect } from "react";
import { useNavigate } from "@remix-run/react";
import { useUser } from "~/hooks/useUser";

export function useBudgetManagerAccess() {
  const navigate = useNavigate();
  const { data: user, isLoading: userLoading } = useUser();

  useEffect(() => {
    if (!userLoading && user) {
      if (user.role !== "BUDGET_MANAGER") {
        navigate("/dashboard", { replace: true });
      }
    }
  }, [user, userLoading, navigate]);

  return {
    user,
    userLoading,
    isBudgetManager: user?.role === "BUDGET_MANAGER",
  };
}

