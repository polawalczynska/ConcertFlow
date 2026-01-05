import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@remix-run/react";
import { authApi } from "~/lib/api-client";
import type { LoginRequest, RegisterRequest, AuthResponse, RefreshTokenRequest } from "~/api";
import {
  setAccessToken,
  setRefreshToken,
  setRememberMeToken,
  clearTokens,
} from "~/shared/utils/helpers/token-storage";
import { getRedirectPathForRole } from "~/shared/constants/routes";

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
      } catch {
        navigate("/login");
      }
    },
  });
}

export function useRegister() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (registerRequest: RegisterRequest): Promise<AuthResponse> => {
      await authApi.register(registerRequest);
      
      const loginRequest: LoginRequest = {
        email: registerRequest.email,
        password: registerRequest.password,
        rememberMe: false,
      };
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
          queryKey: ["user", "me"],
          queryFn: async () => {
            const { userApi } = await import("~/lib/api-client");
            const response = await userApi.getCurrentUser();
            return response.data;
          },
        });
        
        const redirectPath = getRedirectPathForRole(userResponse?.role);
        navigate(redirectPath);
      } catch {
        const redirectPath = getRedirectPathForRole(data.role);
        navigate(redirectPath);
      }
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
      } catch {
      }
    },
    onSuccess: () => {
      clearTokens();
      queryClient.clear();
      navigate("/login");
    },
    onError: () => {
      clearTokens();
      queryClient.clear();
      navigate("/login");
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
    onError: () => {
      clearTokens();
      queryClient.clear();
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    },
  });
}

