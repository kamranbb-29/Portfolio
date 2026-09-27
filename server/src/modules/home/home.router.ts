import { Router } from "express";

import { getHome, updateHome } from "./home.controller";

import { requireAuth } from "../../middleware/requireAuth";

const router = Router();

router.get("/", getHome);
router.patch("/", requireAuth, updateHome);

export default router;
