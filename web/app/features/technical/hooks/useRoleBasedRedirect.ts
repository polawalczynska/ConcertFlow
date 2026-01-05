import { useEffect } from "react";
import { useNavigate } from "@remix-run/react";
import type { UserResponse } from "~/api";
import { getRedirectPathForRole } from "~/shared/constants/routes";

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
        const redirectPath = getRedirectPathForRole(user.role, true);
        navigate(redirectPath, { replace: true });
      }
    }
  }, [user, userLoading, userError, navigate, expectedRole]);
}

