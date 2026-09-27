import { z } from "zod";

const educationSchema = z.object({
  institution: z.string().trim().min(1, "Institution is required"),
  degree: z.string().trim().min(1, "Degree is required"),
  field: z.string().trim().min(1, "Field is required"),
  startYear: z.number().int(),
  endYear: z.number().int().optional(),
  description: z.string().trim().optional(),
});

const experienceSchema = z.object({
  organization: z.string().trim().min(1, "Organization is required"),
  role: z.string().trim().min(1, "Role is required"),
  startDate: z.string().trim().min(1, "Start date is required"),
  endDate: z.string().trim().optional(),
  description: z.string().trim().min(1, "Description is required"),
});

export const createAboutSchema = z.object({
  biography: z.string().trim().min(1, "Biography is required"),
  interests: z.array(z.string().trim().min(1)),
  goals: z.array(z.string().trim().min(1)),
  education: z.array(educationSchema),
  experience: z.array(experienceSchema),
});

export const updateAboutSchema = createAboutSchema.partial();

export type UpdateAboutData = z.infer<typeof updateAboutSchema>;
