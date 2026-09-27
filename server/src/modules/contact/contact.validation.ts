import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters long")
    .max(100, "Name is too long"),

  email: z.string().trim().email("Invalid email address"),

  subject: z
    .string()
    .trim()
    .min(2, "Subject must be at least 2 characters long")
    .max(200, "Subject is too long"),

  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters long")
    .max(5000, "Message is too long"),
});

export type ContactInput = z.infer<typeof contactSchema>;
