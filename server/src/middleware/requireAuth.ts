import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";
import jwt from "jsonwebtoken";

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies.token;

  if (!token) {
    throw new AppError("Unauthorized", 401);
  }

  const key = process.env.JWT_SECRET;

  if (!key) {
    throw new AppError("key not defined in environment variables", 500);
  }

  try {
    const decoded = jwt.verify(token, key);

    if (
      typeof decoded === "string" ||
      !decoded.id ||
      typeof decoded.id !== "string"
    ) {
      return next(new AppError("Unauthorized", 401));
    }

    req.adminId = decoded.id;

    next();
  } catch (err) {
    next(new AppError("Unauthorized", 401));
  }
};
