import { Router } from "express";
import { requireAuth } from "../../middleware/requireAuth";

import {
  getAllSkills,
  getSkillById,
  createSkill,
  updateSkill,
  deleteSkill,
} from "./skills.controller";

const router = Router();

router.get("/", getAllSkills);
router.get("/:id", getSkillById);
router.post("/", requireAuth, createSkill);
router.patch("/:id", requireAuth, updateSkill);
router.delete("/:id", requireAuth, deleteSkill);

export default router;
