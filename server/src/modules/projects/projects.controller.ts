import type { Request, Response, NextFunction } from "express";
import projectsService from "./projects.service";
import { AppError } from "../../utils/AppError";
import { validateObjectId } from "../../utils/validateObjectId";

import { createProjectSchema, updateProjectSchema } from "./project.validation";

export const getAllProjects = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const projects = await projectsService.getAllProjects();
    return res.status(200).json({ projects });
  } catch (err) {
    next(err);
  }
};

export const getProjectById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;

    if (typeof id !== "string") {
      throw new AppError("Invalid project id", 400);
    }
    validateObjectId(id);

    const project = await projectsService.getProjectById(id);

    if (!project) {
      throw new AppError("Project not found", 404);
    }
    return res.status(200).json({ project });
  } catch (err) {
    next(err);
  }
};

export const createProject = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = createProjectSchema.parse(req.body);

    const project = await projectsService.createProject(data);

    return res.status(201).json(project);
  } catch (err) {
    next(err);
  }
};

export const updateProject = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = updateProjectSchema.parse(req.body);
    const id = req.params.id;
    if (typeof id !== "string") {
      throw new AppError("Invalid project id", 400);
    }
    validateObjectId(id);
    const project = await projectsService.updateProject(id, data);

    if (!project) {
      throw new AppError("Project not found", 404);
    }

    return res.status(200).json(project);
  } catch (err) {
    next(err);
  }
};

export const deleteProject = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;
    if (typeof id !== "string") {
      throw new AppError("Invalid project id", 400);
    }
    validateObjectId(id);
    const project = await projectsService.deleteProject(id);

    if (!project) {
      throw new AppError("Project not found", 404);
    }

    return res.status(200).json(project);
  } catch (err) {
    next(err);
  }
};
