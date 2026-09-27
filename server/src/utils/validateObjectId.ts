import mongoose from "mongoose";
import { AppError } from "./AppError";

export const validateObjectId = (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError("Invalid id format", 400);
  }
};

