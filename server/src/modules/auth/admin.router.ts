import { Router } from "express";
import { login, getMe, logout } from "./admin.controller";
import { requireAuth } from "../../middleware/requireAuth";

const router = Router();

router.post("/login", login);
router.get("/me", requireAuth, getMe);
router.post("/logout", logout);

export default router;
