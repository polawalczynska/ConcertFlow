import { useEffect, useState } from "react";
import { useNavigate } from "@remix-run/react";
import { getAccessToken, getRefreshToken, getRememberMeToken, isTokenExpired } from "~/shared/utils";
import { useTokenRefresh } from "~/hooks/useTokenRefresh";

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  
  useTokenRefresh();

  useEffect(() => {
    setMounted(true);
    
    const checkAuth = () => {
      const accessToken = getAccessToken();
      const refreshToken = getRefreshToken();
      const rememberMeToken = getRememberMeToken();

      if (refreshToken || rememberMeToken) {
        setIsAuth(true);
        return;
      }

      if (accessToken) {
        const expired = isTokenExpired(accessToken);
        if (expired) {
          setIsAuth(false);
          navigate("/login", { replace: true });
        } else {
          setIsAuth(true);
        }
      } else {
        setIsAuth(false);
        navigate("/login", { replace: true });
      }
    };

    checkAuth();

    const interval = setInterval(checkAuth, 30000);

    return () => clearInterval(interval);
  }, [navigate]);

  if (!mounted || !isAuth) {
    return null;
  }

  return <>{children}</>;
}

