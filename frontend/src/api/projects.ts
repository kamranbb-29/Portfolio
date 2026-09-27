import type {
  Project,
  CreateProjectData,
  UpdateProjectData,
} from "@/types/api";
import { apiFetch } from "./client";

export const projectsApi = {
  getAll: async (): Promise<{ projects: Project[] }> => {
    return apiFetch<{ projects: Project[] }>("/projects", {
      method: "GET",
    });
  },

  getById: async (id: string): Promise<{ project: Project }> => {
    return apiFetch<{ project: Project }>(`/projects/${id}`, {
      method: "GET",
    });
  },

  create: async (data: CreateProjectData): Promise<Project> => {
    return apiFetch<Project>("/projects", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  update: async (id: string, data: UpdateProjectData): Promise<Project> => {
    return apiFetch<Project>(`/projects/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  },

  delete: async (id: string): Promise<Project> => {
    return apiFetch<Project>(`/projects/${id}`, {
      method: "DELETE",
    });
  },
};
