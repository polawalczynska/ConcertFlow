import { useEffect, useState } from "react";
import { useNavigate } from "@remix-run/react";
import { isAuthenticated } from "~/lib/token-storage";
import { useUser } from "~/hooks/useUser";
import LandingPage from "./landing";

function getRedirectPathForRole(role?: string): string {
  if (role === "BUDGET_MANAGER") {
    return "/budget-dashboard";
  }
  if (role === "TECHNICAL_MANAGER") {
    return "/technical-dashboard";
  }
  return "/dashboard";
}

export default function Index() {
  const navigate = useNavigate();
  const { data: user, isLoading } = useUser();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    
    if (!isAuthenticated()) {
      return;
    }

    if (!isLoading && user) {
      const redirectPath = getRedirectPathForRole(user.role);
      navigate(redirectPath);
    }
  }, [navigate, user, isLoading, isClient]);

  if (!isClient || !isAuthenticated()) {
    return <LandingPage />;
  }

  return null;
}
