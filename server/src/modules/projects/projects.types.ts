import mongoose from "mongoose";

export type ProjectImage = {
  URL: string;
  isPrimary?: boolean;
};

export type CreateProjectData = {
  name: string;
  description: string;
  motivation: string;
  githubURL: string;
  liveURL?: string;
  videoURL?: string;
  techStack: mongoose.Types.ObjectId[];
  images: ProjectImage[];
};
