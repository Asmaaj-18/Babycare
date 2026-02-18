import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware";
import * as growthController from "../controllers/growth.controller";

const router = Router();

//////////////////////////////////////////////////////
// 📏 CREATE GROWTH (Parent & Doctor)
//////////////////////////////////////////////////////
router.post(
  "/",
  requireAuth,
  growthController.createGrowth
);

//////////////////////////////////////////////////////
// 📏 UPDATE GROWTH (Parent & Doctor)
//////////////////////////////////////////////////////
router.put(
  "/:id",
  requireAuth,
  growthController.updateGrowth
);

//////////////////////////////////////////////////////
// 📏 DELETE GROWTH (Parent & Doctor)
//////////////////////////////////////////////////////
router.delete(
  "/:id",
  requireAuth,
  growthController.deleteGrowth
);

//////////////////////////////////////////////////////
// 📏 GET GROWTH BY BABY
//////////////////////////////////////////////////////
router.get(
  "/:babyId",
  requireAuth,
  growthController.getGrowthByBaby
);

export default router;
