import type { LoginData, LoginResponse, LogoutResponse, Admin } from "@/types/api";
import { apiFetch } from "./client";
import { ApiError } from "./client";

export { ApiError };

export const authApi = {
  login: async (data: LoginData): Promise<LoginResponse> => {
    return apiFetch<LoginResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  logout: async (): Promise<LogoutResponse> => {
    return apiFetch<LogoutResponse>("/auth/logout", {
      method: "POST",
    });
  },

  getMe: async (): Promise<Admin> => {
    return apiFetch<Admin>("/auth/me", {
      method: "GET",
    });
  },
};
