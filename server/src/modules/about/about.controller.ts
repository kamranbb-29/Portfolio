import type { Request, Response, NextFunction } from "express";
import aboutService from "./about.service";
import { updateAboutSchema } from "./about.validation";
import { AppError } from "../../utils/AppError";

export const getAbout = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const about = await aboutService.getAbout();

    if (!about) {
      throw new AppError("About data not found", 404);
    }

    return res.status(200).json(about);
  } catch (err) {
    next(err);
  }
};

export const updateAbout = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = updateAboutSchema.parse(req.body);

    const about = await aboutService.updateAbout(data);

    return res.status(200).json(about);
  } catch (err) {
    next(err);
  }
};
