import { useEffect, useRef, useCallback } from "react";
import { useNavigate } from "@remix-run/react";
import { getAccessToken, getRefreshToken, getRememberMeToken, setAccessToken, setRefreshToken, setRememberMeToken, clearTokens } from "~/lib/token-storage";
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
  const refreshTokenRef = useRef<(() => Promise<void>) | null>(null);

  const scheduleTokenRefresh = useCallback((token: string) => {
    if (refreshTimeoutRef.current) {
      clearTimeout(refreshTimeoutRef.current);
    }

    const expirationTime = getTokenExpirationTime(token);
    if (!expirationTime) {
      refreshTimeoutRef.current = setTimeout(() => {
        refreshTokenRef.current?.();
      }, 55 * 60 * 1000);
      return;
    }

    const currentTime = Date.now();
    const timeUntilExpiration = expirationTime - currentTime;
    const refreshTime = Math.max(timeUntilExpiration - 5 * 60 * 1000, 10 * 1000);

    refreshTimeoutRef.current = setTimeout(() => {
      refreshTokenRef.current?.();
    }, refreshTime);
  }, []);

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

      const { accessToken, refreshToken: newRefreshToken, rememberMeToken: newRememberMeToken } = response.data;

      if (accessToken) {
        setAccessToken(accessToken);
        if (newRefreshToken) {
          setRefreshToken(newRefreshToken);
        }
        if (newRememberMeToken) {
          setRememberMeToken(newRememberMeToken);
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
  }, [navigate, scheduleTokenRefresh]);

  refreshTokenRef.current = refreshToken;

  useEffect(() => {
    const accessToken = getAccessToken();
    
    if (accessToken) {
      if (isTokenExpiringSoon(accessToken, 300)) {
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

