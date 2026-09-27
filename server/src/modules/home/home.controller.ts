import type { Request, Response, NextFunction } from "express";
import { updateHomeSchema } from "./home.validation";
import homeService from "./home.service";
import { AppError } from "../../utils/AppError";

export const getHome = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const home = await homeService.getHome();

    if (!home) {
      throw new AppError("Home data not found", 404);
    }
    return res.status(200).json(home);
  } catch (err) {
    next(err);
  }
};

export const updateHome = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = updateHomeSchema.parse(req.body);

    const home = await homeService.updateHome(data);

    return res.status(200).json(home);
  } catch (err) {
    next(err);
  }
};
