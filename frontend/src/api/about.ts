import type { About, UpdateAboutData } from "@/types/api";
import { apiFetch } from "./client";

export const aboutApi = {
  get: async (): Promise<About> => {
    return apiFetch<About>("/about", {
      method: "GET",
    });
  },

  update: async (data: UpdateAboutData): Promise<About> => {
    return apiFetch<About>("/about", {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  },
};
