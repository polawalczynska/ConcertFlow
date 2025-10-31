import { useMutation } from "@tanstack/react-query";
import { authApi } from "~/lib/api-client";
import type { AuthResponse, LoginRequest, RegisterRequest } from "~/api";
import { useNavigate } from "@remix-run/react";

export function useLogin() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (loginRequest: LoginRequest): Promise<AuthResponse> => {
      const response = await authApi.login(loginRequest);
      return response.data;
    },
    onSuccess: (data) => {
      if (data.token) {
        localStorage.setItem("authToken", data.token);
      }

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

