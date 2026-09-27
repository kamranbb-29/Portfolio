import Admin from "./admin.model";
import { AppError } from "../../utils/AppError";

import type { LoginData } from "./admin.validation";
import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";

const login = async (data: LoginData) => {
  const admin = await Admin.findOne({ email: data.email });
  if (!admin) {
    throw new AppError("Invalid credentials", 401);
  }
  const result = await bcrypt.compare(data.password, admin.passwordHash);
  if (!result) {
    throw new AppError("Invalid credentials", 401);
  }

  const key = process.env.JWT_SECRET;
  if (!key) {
    throw new AppError(
      "JWT secret key not defined in environment variables",
      500,
    );
  }
  const token = jwt.sign({ id: admin._id }, key, { expiresIn: "1d" });
  return { admin, token };
};

const getAdminById = async (id: string) => {
  return Admin.findById(id).select("-passwordHash");
};

export default {
  login,
  getAdminById,
};
