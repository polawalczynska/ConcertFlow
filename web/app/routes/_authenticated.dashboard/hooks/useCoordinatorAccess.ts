import { useEffect } from "react";
import { useNavigate } from "@remix-run/react";
import { useUser } from "~/hooks/useUser";

export function useCoordinatorAccess() {
  const navigate = useNavigate();
  const { data: user, isLoading: userLoading, error: userError } = useUser();

  useEffect(() => {
    if (!userLoading) {
      if (userError || !user) {
        return;
      }
      if (user.role !== "COORDINATOR") {
        if (user.role === "BUDGET_MANAGER") {
          navigate("/budget", { replace: true });
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
    isCoordinator: user?.role === "COORDINATOR",
  };
}

