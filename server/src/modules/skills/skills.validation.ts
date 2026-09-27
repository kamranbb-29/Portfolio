import { z } from "zod";

export const createSkillSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "skill name is required and should be a non-empty string"),
  category: z.enum(
    ["Technical", "Non-Technical"],
    "skill category is required and should be either 'Technical' or 'Non-Technical'",
  ),
  proficiency: z.enum(
    ["Beginner", "Intermediate", "Advanced"],
    "skill proficiency is required and should be one of 'Beginner', 'Intermediate', or 'Advanced'",
  ),
});
export type CreateSkillData = z.infer<typeof createSkillSchema>;
export type UpdateSkillData = z.infer<typeof updateSkillSchema>;

export const updateSkillSchema = createSkillSchema.partial();
