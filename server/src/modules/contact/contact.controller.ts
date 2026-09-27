import type { Request, Response, NextFunction } from "express";

import { contactSchema } from "./contact.validation";
import { sendContactMessage } from "./contact.service";
import { AppError } from "../../utils/AppError";

export const submitContactForm = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = contactSchema.safeParse(req.body);

    if (!result.success) {
      return next(
        new AppError(
          result.error.issues[0]?.message ?? "Invalid contact form data",
          400,
        ),
      );
    }

    await sendContactMessage(result.data);

    return res.status(200).json({
      success: true,
      message: "Message received successfully",
    });
  } catch (error) {
    next(error);
  }
};
