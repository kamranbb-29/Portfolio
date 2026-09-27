import { z } from "zod";

export const createHomeSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "name is required and should be a non-empty string"),
  headline: z
    .string()
    .trim()
    .min(1, "headline is required and should be a non-empty string"),
  introduction: z
    .string()
    .trim()
    .min(1, "introduction is required and should be a non-empty string"),
  profileImage: z
    .string()
    .trim()
    .min(1, "profile image is required and should be a non-empty string")
    .url("profile image should be a valid URL"),
  resumeLink: z
    .string()
    .trim()
    .min(1, "resume link is required and should be a non-empty string")
    .url("resume link should be a valid URL"),
  educationSummary: z
    .string()
    .trim()
    .min(1, "education summary is required and should be a non-empty string"),
});

export const updateHomeSchema = createHomeSchema.partial();

export type CreateHomeData = z.infer<typeof createHomeSchema>;
export type UpdateHomeData = z.infer<typeof updateHomeSchema>;
