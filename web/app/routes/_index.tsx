import { useEffect } from "react";
import { useNavigate } from "@remix-run/react";
import { isAuthenticated } from "~/lib/token-storage";
import { useUser } from "~/hooks/useUser";

function getRedirectPathForRole(role?: string): string {
  if (role === "BUDGET_MANAGER") {
    return "/budget-dashboard";
  }
  if (role === "TECHNICAL_MANAGER") {
    return "/technical";
  }
  return "/dashboard";
}

export default function Index() {
  const navigate = useNavigate();
  const { data: user, isLoading } = useUser();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
      return;
    }

    if (!isLoading && user) {
      const redirectPath = getRedirectPathForRole(user.role);
      navigate(redirectPath);
    } else {
      navigate("/login");
    }
  }, [navigate, user, isLoading]);

  return null;
}
