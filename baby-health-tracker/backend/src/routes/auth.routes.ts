import { Router } from "express";
import * as authController from "../controllers/auth.controller";
import { requireAuth } from "../middleware/auth.middleware";
import { AuthRequest } from "../types/auth.types";

const router = Router();

//////////////////////////////////////////////////////
// 📝 REGISTER
//////////////////////////////////////////////////////
router.post("/register", authController.register);

//////////////////////////////////////////////////////
// 🔑 LOGIN
//////////////////////////////////////////////////////
router.post("/login", authController.login);

//////////////////////////////////////////////////////
// 👤 GET CURRENT USER
//////////////////////////////////////////////////////
router.get("/me", requireAuth, (req: AuthRequest, res) => {
  res.json({ user: req.user });
});

export default router;
