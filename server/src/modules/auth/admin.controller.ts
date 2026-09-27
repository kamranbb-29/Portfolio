import { loginSchema } from "./admin.validation";
import type { Request, Response, NextFunction } from "express";

import adminService from "./admin.service";
import { AppError } from "../../utils/AppError";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = loginSchema.parse(req.body);
    const { admin, token } = await adminService.login(data);

    if (!admin) {
      throw new AppError("Invalid Credentials", 401);
    }

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      admin: {
        id: admin._id,
        email: admin.email,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const getMe = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.adminId) {
      throw new AppError("unauthorized", 401);
    }
    const admin = await adminService.getAdminById(req.adminId);

    if (!admin) {
      throw new AppError("unauthorized", 401);
    }
    return res.status(200).json(admin);
  } catch (err) {
    next(err);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 0,
    });
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    next(err);
  }
};
