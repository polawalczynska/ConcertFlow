import { useEffect } from "react";
import { useNavigate } from "@remix-run/react";
import type { UserResponse } from "~/api";

function getRedirectPathForRole(role?: string): string {
  if (role === "BUDGET_MANAGER") {
    return "/budget-dashboard";
  }
  if (role === "TECHNICAL_MANAGER") {
    return "/technical-dashboard";
  }
  if (role === "COORDINATOR") {
    return "/manage";
  }
  return "/dashboard";
}

export function useRoleBasedRedirect(
  user: UserResponse | undefined,
  userLoading: boolean,
  userError: unknown,
  expectedRole: string
) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!userLoading) {
      if (userError || !user) {
        return;
      }
      if (user.role !== expectedRole) {
        const redirectPath = getRedirectPathForRole(user.role);
        navigate(redirectPath, { replace: true });
      }
    }
  }, [user, userLoading, userError, navigate, expectedRole]);
}

