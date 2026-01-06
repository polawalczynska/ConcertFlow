import { useEffect, useState } from "react";
import { useNavigate } from "@remix-run/react";
import { isAuthenticated } from "~/shared/utils/helpers/token-storage";
import { useUser } from "~/shared/hooks/domain";
import { getRedirectPathForRole } from "~/shared/constants/routes";
import LandingPage from "~/routes/landing";

export default function Index() {
  const navigate = useNavigate();
  const { data: user, isLoading, error } = useUser();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    
    if (!isAuthenticated()) {
      return;
    }

    if (!isLoading && error) {
      return;
    }

    if (!isLoading && user) {
      const redirectPath = getRedirectPathForRole(user.role);
      navigate(redirectPath);
    }
  }, [navigate, user, isLoading, isClient, error]);

  if (!isClient || !isAuthenticated()) {
    return <LandingPage />;
  }

  if (isLoading || error) {
    return <LandingPage />;
  }

  return null;
}
