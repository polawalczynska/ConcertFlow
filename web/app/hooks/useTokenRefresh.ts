import { useEffect, useRef, useCallback } from "react";
import { useNavigate } from "@remix-run/react";
import { getAccessToken, getRefreshToken, getRememberMeToken, setAccessToken, setRefreshToken, clearTokens } from "~/lib/token-storage";
import { isTokenExpiringSoon, getTokenExpirationTime } from "~/lib/token-utils";
import axios from "axios";

interface WindowWithEnv extends Window {
  ENV?: {
    API_BASE_URL?: string;
  };
}

const basePath = typeof window !== "undefined" 
  ? (window as unknown as WindowWithEnv).ENV?.API_BASE_URL || "http://localhost:8080"
  : "http://localhost:8080";

export function useTokenRefresh() {
  const navigate = useNavigate();
  const refreshTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const refreshToken = useCallback(async () => {
    try {
      const refreshTokenValue = getRefreshToken() || getRememberMeToken();
      
      if (!refreshTokenValue) {
        clearTokens();
        navigate("/login", { replace: true });
        return;
      }

      const response = await axios.post(
        `${basePath}/api/auth/refresh`,
        { refreshToken: refreshTokenValue },
        { headers: { "Content-Type": "application/json" } }
      );

      const { accessToken, refreshToken: newRefreshToken } = response.data;

      if (accessToken) {
        setAccessToken(accessToken);
        if (newRefreshToken) {
          setRefreshToken(newRefreshToken);
        }
        
        scheduleTokenRefresh(accessToken);
      } else {
        throw new Error("No access token in response");
      }
    } catch (error) {
      console.error("Token refresh failed:", error);
      clearTokens();
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  const scheduleTokenRefresh = useCallback((token: string) => {
    if (refreshTimeoutRef.current) {
      clearTimeout(refreshTimeoutRef.current);
    }

    const expirationTime = getTokenExpirationTime(token);
    if (!expirationTime) {
      refreshTimeoutRef.current = setTimeout(() => refreshToken(), 14 * 60 * 1000);
      return;
    }

    const currentTime = Date.now();
    const timeUntilExpiration = expirationTime - currentTime;
    const refreshTime = Math.max(timeUntilExpiration - 60 * 1000, 5000);

    refreshTimeoutRef.current = setTimeout(() => refreshToken(), refreshTime);
  }, [refreshToken]);

  useEffect(() => {
    const accessToken = getAccessToken();
    
    if (accessToken) {
      if (isTokenExpiringSoon(accessToken, 60)) {
        refreshToken();
      } else {
        scheduleTokenRefresh(accessToken);
      }
    } else {
      const refreshTokenValue = getRefreshToken() || getRememberMeToken();
      if (refreshTokenValue) {
        refreshToken();
      }
    }

    return () => {
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
      }
    };
  }, [navigate, refreshToken, scheduleTokenRefresh]);
}

