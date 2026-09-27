import type { ContactInput, ContactResponse } from "@/types/api";
import { apiFetch } from "./client";

export const contactApi = {
  submit: async (data: ContactInput): Promise<ContactResponse> => {
    return apiFetch<ContactResponse>("/api/contact", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
};
