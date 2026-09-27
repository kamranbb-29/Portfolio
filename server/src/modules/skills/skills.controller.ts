import type { Request, Response, NextFunction } from "express";
import skillsService from "./skills.service";
import { AppError } from "../../utils/AppError";
import { validateObjectId } from "../../utils/validateObjectId";

import { createSkillSchema, updateSkillSchema } from "./skills.validation";

export const getAllSkills = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const skills = await skillsService.getAllSkills();
    return res.status(200).json({ skills });
  } catch (err) {
    next(err);
  }
};

export const getSkillById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;

    if (typeof id !== "string") {
      throw new AppError("Invalid format id", 400);
    }
    validateObjectId(id);
    const skill = await skillsService.getSkillById(id);

    if (!skill) {
      throw new AppError("Skill not found", 404);
    }
    return res.status(200).json({ skill });
  } catch (err) {
    next(err);
  }
};

export const createSkill = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = createSkillSchema.parse(req.body);

    const skill = await skillsService.createSkill(data);

    return res.status(201).json(skill);
  } catch (err) {
    next(err);
  }
};

export const updateSkill = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;
    if (typeof id !== "string") {
      throw new AppError("Invalid format id", 400);
    }
    validateObjectId(id);
    const data = updateSkillSchema.parse(req.body);

    const skill = await skillsService.updateSkill(id, data);

    if (!skill) {
      throw new AppError("Skill not found", 404);
    }

    return res.status(200).json(skill);
  } catch (err) {
    next(err);
  }
};

export const deleteSkill = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;
    if (typeof id !== "string") {
      throw new AppError("Invalid format id", 400);
    }
    validateObjectId(id);
    const skill = await skillsService.deleteSkill(id);

    if (!skill) {
      throw new AppError("Skill not found", 404);
    }

    return res.status(200).json(skill);
  } catch (err) {
    next(err);
  }
};
