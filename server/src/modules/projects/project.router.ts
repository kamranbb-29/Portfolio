import { Router } from "express";
import { requireAuth } from "../../middleware/requireAuth";

import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from "./projects.controller";

const router = Router();

router.get("/", getAllProjects);
router.get("/:id", getProjectById);
router.post("/", requireAuth, createProject);
router.patch("/:id", requireAuth, updateProject);
router.delete("/:id", requireAuth, deleteProject);

export default router;
