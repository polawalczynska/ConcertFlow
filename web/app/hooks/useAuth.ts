import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@remix-run/react";
import { authApi } from "~/lib/api-client";
import type { LoginRequest, RegisterRequest, AuthResponse, RefreshTokenRequest } from "~/api";
import {
  setAccessToken,
  setRefreshToken,
  setRememberMeToken,
  clearTokens,
} from "~/lib/token-storage";


export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (loginRequest: LoginRequest): Promise<AuthResponse> => {
      const response = await authApi.login(loginRequest);
      return response.data;
    },
    onSuccess: (data) => {
      if (data.accessToken) {
        setAccessToken(data.accessToken);
      }
      if (data.refreshToken) {
        setRefreshToken(data.refreshToken);
      }
      if (data.rememberMeToken) {
        setRememberMeToken(data.rememberMeToken);
      }

      queryClient.invalidateQueries({ queryKey: ["auth"] });
      navigate("/");
    },
    onError: (error: any) => {
      console.error("Login error:", error);
    },
  });
}

export function useRegister() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (registerRequest: RegisterRequest): Promise<void> => {
      await authApi.register(registerRequest);
    },
    onSuccess: () => {
      navigate("/login");
    },
    onError: (error: any) => {
      console.error("Registration error:", error);
    },
  });
}

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (): Promise<void> => {
      try {
        await authApi.logout();
      } catch (error) {
        console.error("Logout endpoint error:", error);
      }
    },
    onSuccess: () => {
      clearTokens();
      queryClient.clear();
      navigate("/login");
    },
    onError: (error: any) => {
      clearTokens();
      queryClient.clear();
      navigate("/login");
      console.error("Logout error:", error);
    },
  });
}

export function useRefreshToken() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (refreshToken: string): Promise<AuthResponse> => {
      const request: RefreshTokenRequest = { refreshToken };
      const response = await authApi.refreshToken(request);
      return response.data;
    },
    onSuccess: (data) => {
      if (data.accessToken) {
        setAccessToken(data.accessToken);
      }
      if (data.refreshToken) {
        setRefreshToken(data.refreshToken);
      }

      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
    onError: (error: any) => {
      console.error("Token refresh error:", error);
      clearTokens();
      queryClient.clear();
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    },
  });
}

