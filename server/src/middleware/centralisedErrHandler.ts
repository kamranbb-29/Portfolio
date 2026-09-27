import type { ErrorRequestHandler } from "express";
import { AppError } from "../utils/AppError";

import { ZodError } from "zod";

export const centralisedErrHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next,
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  } else if (err instanceof ZodError) {
    return res
      .status(400)
      .json({ message: "validation failed", errors: err.issues });
  } else {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
