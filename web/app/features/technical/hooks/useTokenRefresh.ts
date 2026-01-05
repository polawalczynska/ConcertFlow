import { useEffect, useRef, useCallback } from "react";
import { useNavigate } from "@remix-run/react";
import { getAccessToken, getRefreshToken, getRememberMeToken, setAccessToken, setRefreshToken, setRememberMeToken, clearTokens, isTokenExpiringSoon, getTokenExpirationTime } from "~/shared/utils";
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

    const now = Date.now();
    const timeUntilExpiration = expirationTime - now;
    const refreshTime = timeUntilExpiration - 5 * 60 * 1000;

    if (refreshTime > 0) {
      refreshTimeoutRef.current = setTimeout(() => {
        refreshTokenRef.current?.();
      }, refreshTime);
    } else {
      refreshTokenRef.current?.();
    }
  }, []);

  const refreshToken = useCallback(async () => {
    const refreshTokenValue = getRefreshToken();
    const rememberMeTokenValue = getRememberMeToken();

    if (!refreshTokenValue && !rememberMeTokenValue) {
      return;
    }

    try {
      const tokenToUse = refreshTokenValue || rememberMeTokenValue;
      const response = await axios.post(
        `${basePath}/api/v1/auth/refresh`,
        { refreshToken: tokenToUse }
      );

      if (response.data.accessToken) {
        setAccessToken(response.data.accessToken);
      }
      if (response.data.refreshToken) {
        setRefreshToken(response.data.refreshToken);
      }
      if (response.data.rememberMeToken) {
        setRememberMeToken(response.data.rememberMeToken);
      }

      if (response.data.accessToken) {
        scheduleTokenRefresh(response.data.accessToken);
      }
    } catch (error) {
      clearTokens();
      navigate("/login", { replace: true });
    }
  }, [navigate, scheduleTokenRefresh]);

  useEffect(() => {
    refreshTokenRef.current = refreshToken;

    const accessToken = getAccessToken();
    if (accessToken && isTokenExpiringSoon(accessToken, 5 * 60)) {
      refreshToken();
    } else if (accessToken) {
      scheduleTokenRefresh(accessToken);
    }

    return () => {
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
      }
    };
  }, [refreshToken, scheduleTokenRefresh]);

  return null;
}

