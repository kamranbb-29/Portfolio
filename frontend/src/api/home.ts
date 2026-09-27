import type { Home, UpdateHomeData } from "@/types/api";
import { apiFetch } from "./client";

export const homeApi = {
  get: async (): Promise<Home> => {
    return apiFetch<Home>("/home", {
      method: "GET",
    });
  },

  update: async (data: UpdateHomeData): Promise<Home> => {
    return apiFetch<Home>("/home", {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  },
};
