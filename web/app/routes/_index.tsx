import { useEffect, useState } from "react";
import { useNavigate } from "@remix-run/react";
import { isAuthenticated } from "~/shared/utils/helpers/token-storage";
import { useUser } from "~/hooks/useUser";
import { getRedirectPathForRole } from "~/shared/constants/routes";
import LandingPage from "./landing";

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
