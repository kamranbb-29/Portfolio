export type SkillCategory = "Technical" | "Non-Technical";
export type SkillProficiency = "Beginner" | "Intermediate" | "Advanced";

export interface Skill {
  _id: string;
  name: string;
  category: SkillCategory;
  proficiency: SkillProficiency;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectImage {
  URL: string;
  isPrimary: boolean;
}

export interface Project {
  _id: string;
  name: string;
  description: string;
  motivation: string;
  techStack: Skill[];
  githubURL: string;
  liveURL?: string;
  videoURL?: string;
  images: ProjectImage[];
  createdAt: string;
  updatedAt: string;
}

export interface EducationEntry {
  _id?: string;
  institution: string;
  degree: string;
  field: string;
  startYear: number;
  endYear?: number;
  description?: string;
}

export interface ExperienceEntry {
  _id?: string;
  organization: string;
  role: string;
  startDate: string;
  endDate?: string;
  description: string;
}

export interface About {
  _id: string;
  biography: string;
  interests: string[];
  goals: string[];
  education: EducationEntry[];
  experience: ExperienceEntry[];
  createdAt: string;
  updatedAt: string;
}

export interface Home {
  _id: string;
  name: string;
  headline: string;
  introduction: string;
  profileImage: string;
  resumeLink: string;
  educationSummary: string;
  createdAt: string;
  updatedAt: string;
}

export interface Admin {
  _id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface ContactInput {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
}

export interface ValidationError {
  message: string;
  path?: string[];
}

export interface ApiError {
  message: string;
  errors?: ValidationError[];
}

export interface CreateProjectData {
  name: string;
  description: string;
  motivation: string;
  githubURL: string;
  liveURL?: string;
  videoURL?: string;
  techStack: string[];
  images: { URL: string; isPrimary?: boolean }[];
}

export interface UpdateProjectData {
  name?: string;
  description?: string;
  motivation?: string;
  githubURL?: string;
  liveURL?: string;
  videoURL?: string;
  techStack?: string[];
  images?: { URL: string; isPrimary?: boolean }[];
}

export interface CreateSkillData {
  name: string;
  category: SkillCategory;
  proficiency: SkillProficiency;
}

export interface UpdateSkillData {
  name?: string;
  category?: SkillCategory;
  proficiency?: SkillProficiency;
}

export interface UpdateHomeData {
  name?: string;
  headline?: string;
  introduction?: string;
  profileImage?: string;
  resumeLink?: string;
  educationSummary?: string;
}

export interface UpdateAboutData {
  biography?: string;
  interests?: string[];
  goals?: string[];
  education?: EducationEntry[];
  experience?: ExperienceEntry[];
}

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  admin: {
    id: string;
    email: string;
  };
}

export interface LogoutResponse {
  message: string;
}
