import type { Skill, CreateSkillData, UpdateSkillData } from "@/types/api";
import { apiFetch } from "./client";

export const skillsApi = {
  getAll: async (): Promise<{ skills: Skill[] }> => {
    return apiFetch<{ skills: Skill[] }>("/skills", {
      method: "GET",
    });
  },

  getById: async (id: string): Promise<{ skill: Skill }> => {
    return apiFetch<{ skill: Skill }>(`/skills/${id}`, {
      method: "GET",
    });
  },

  create: async (data: CreateSkillData): Promise<Skill> => {
    return apiFetch<Skill>("/skills", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  update: async (id: string, data: UpdateSkillData): Promise<Skill> => {
    return apiFetch<Skill>(`/skills/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  },

  delete: async (id: string): Promise<Skill> => {
    return apiFetch<Skill>(`/skills/${id}`, {
      method: "DELETE",
    });
  },
};
