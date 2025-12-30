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

function getRedirectPathForRole(role?: string): string {
  if (role === "BUDGET_MANAGER") {
    return "/budget";
  }
  if (role === "TECHNICAL_MANAGER") {
    return "/technical";
  }
  return "/dashboard";
}

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (loginRequest: LoginRequest): Promise<AuthResponse> => {
      const response = await authApi.login(loginRequest);
      return response.data;
    },
    onSuccess: async (data) => {
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
      
      try {
        const userResponse = await queryClient.fetchQuery({
          queryKey: ["user"],
          queryFn: async () => {
            const { userApi } = await import("~/lib/api-client");
            const response = await userApi.getCurrentUser();
            return response.data;
          },
        });
        
        const redirectPath = getRedirectPathForRole(userResponse?.role);
        navigate(redirectPath);
      } catch (error) {
        console.error("Failed to fetch user after login:", error);
        navigate("/login");
      }
    },
    onError: (error: unknown) => {
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
    onError: (error: unknown) => {
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
    onError: (error: unknown) => {
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
    onError: (error: unknown) => {
      console.error("Token refresh error:", error);
      clearTokens();
      queryClient.clear();
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    },
  });
}

