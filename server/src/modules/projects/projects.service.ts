import { Project } from "./projects.model";
import type {
  CreateProjectData,
  UpdateProjectData,
  ProjectImage,
} from "./project.validation";
import { Skill } from "../skills/skills.model";
import mongoose from "mongoose";
import { AppError } from "../../utils/AppError";

const validateTechStackReferences = async (techStack: string[]) => {
  const uniqueIDs = new Set(techStack.map((id) => id.toString()));

  if (uniqueIDs.size !== techStack.length) {
    throw new AppError("Duplicate skills found in the tech stack", 400);
  }
  const skills = await Skill.find({ _id: { $in: techStack } });

  if (skills.length !== techStack.length) {
    throw new AppError(
      "One or more skills in the tech stack do not exist",
      400,
    );
  }
};

const validateImages = (images: ProjectImage[]) => {
  const newImages = images.filter((image) => image.isPrimary === true);

  if (newImages.length > 1) {
    throw new AppError("A project can have only one primary image", 400);
  }
};

const getAllProjects = async () => {
  const projects = await Project.find({}).populate(
    "techStack",
    "name category proficiency",
  );

  return projects;
};

const getProjectById = async (id: string) => {
  const project = await Project.findById(id).populate(
    "techStack",
    "name category proficiency",
  );
  return project;
};

const createProject = async (data: CreateProjectData) => {
  validateImages(data.images);

  const projectData = {
    name: data.name,
    description: data.description,
    motivation: data.motivation,
    techStack: data.techStack,
    githubURL: data.githubURL,
    images: data.images,

    ...(data.liveURL !== undefined && { liveURL: data.liveURL }),
    ...(data.videoURL !== undefined && { videoURL: data.videoURL }),
  };

  await validateTechStackReferences(data.techStack);
  const project = await Project.create(projectData);

  return project;
};

const updateProject = async (id: string, data: UpdateProjectData) => {
  if (data.images) {
    validateImages(data.images);
  }

  if (data.techStack) {
    await validateTechStackReferences(data.techStack);
  }
  const project = await Project.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  return project;
};

const deleteProject = async (id: string) => {
  const project = await Project.findByIdAndDelete(id);

  return project;
};
export default {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};
