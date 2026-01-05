import { useEffect, useRef, useCallback } from "react";
import { useNavigate } from "@remix-run/react";
import { getAccessToken, getRefreshToken, getRememberMeToken, setAccessToken, setRefreshToken, setRememberMeToken, clearTokens, isTokenExpiringSoon, getTokenExpirationTime } from "~/shared/utils";
import { authApi } from "~/lib/api-client";
import type { RefreshTokenRequest } from "~/api";

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
      const refreshTokenRequest: RefreshTokenRequest = { refreshToken: tokenToUse };
      const response = await authApi.refreshToken(refreshTokenRequest);

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

