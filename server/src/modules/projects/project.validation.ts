import { z } from "zod";
import mongoose from "mongoose";
export const projectImageSchema = z.object({
  URL: z
    .string()
    .trim()
    .min(1, "project image url is required and should be a non-empty string")
    .url("project image url should be a valid URL"),
  isPrimary: z.boolean().optional(),
});
export const createProjectSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "project name is required and should be a non-empty string"),
  description: z
    .string()
    .trim()
    .min(1, "project description is required and should be a non-empty string"),

  motivation: z
    .string()
    .trim()
    .min(1, "project motivation is required and should be a non-empty string"),
  techStack: z
    .array(
      z
        .string()
        .trim()
        .min(1, "project tech stack should be an array of non-empty strings")
        .refine(
          (id) => {
            return mongoose.Types.ObjectId.isValid(id);
          },
          {
            message:
              "project tech stack should be an array of valid ObjectId strings",
          },
        ),
    )
    .min(1, "project tech stack is required and should be a non-empty array"),
  githubURL: z
    .string()
    .trim()
    .min(1, "project github URL is required and should be a non-empty string")
    .url("project github URL should be a valid URL"),
  liveURL: z
    .string()
    .trim()
    .url("project live URL should be a valid URL")
    .optional(),
  images: z
    .array(projectImageSchema)
    .min(1, "project images is required and should be a non-empty array"),
  videoURL: z
    .string()
    .trim()
    .url("project video URL should be a valid URL")
    .optional(),
});

export const updateProjectSchema = createProjectSchema.partial();

export type CreateProjectData = z.infer<typeof createProjectSchema>;
export type UpdateProjectData = z.infer<typeof updateProjectSchema>;
export type ProjectImage = z.infer<typeof projectImageSchema>;
