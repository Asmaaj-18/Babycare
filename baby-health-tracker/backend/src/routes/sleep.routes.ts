import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware";
import { requireParent } from "../middleware/role.middleware";
import * as sleepController from "../controllers/sleep.controller";

const router = Router();

//////////////////////////////////////////////////////
// 😴 CREATE SLEEP (Parent seulement)
//////////////////////////////////////////////////////
router.post(
  "/",
  requireAuth,
  requireParent,
  sleepController.createSleep
);

//////////////////////////////////////////////////////
// 😴 UPDATE SLEEP (Parent seulement)
//////////////////////////////////////////////////////
router.put(
  "/:id",
  requireAuth,
  requireParent,
  sleepController.updateSleep
);

//////////////////////////////////////////////////////
// 😴 DELETE SLEEP (Parent seulement)
//////////////////////////////////////////////////////
router.delete(
  "/:id",
  requireAuth,
  requireParent,
  sleepController.deleteSleep
);

//////////////////////////////////////////////////////
// 😴 GET SLEEP BY BABY
// Parent & Doctor
//////////////////////////////////////////////////////
router.get(
  "/:babyId",
  requireAuth,
  sleepController.getSleepByBaby
);

export default router;
