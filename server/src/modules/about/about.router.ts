import { Router } from "express";
import { getAbout, updateAbout } from "./about.controller";

import { requireAuth } from "../../middleware/requireAuth";

const router = Router();

router.get("/", getAbout);
router.patch("/", requireAuth, updateAbout);

export default router;
