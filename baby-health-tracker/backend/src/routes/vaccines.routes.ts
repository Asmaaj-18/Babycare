import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware";
import { requireDoctor } from "../middleware/role.middleware";
import * as vaccinesController from "../controllers/vaccines.controller";

const router = Router();

//////////////////////////////////////////////////////
// 💉 CREATE VACCINE (Doctor only)
//////////////////////////////////////////////////////
router.post(
  "/",
  requireAuth,
  requireDoctor,
  vaccinesController.createVaccine
);

//////////////////////////////////////////////////////
// 💉 UPDATE VACCINE (Doctor only)
//////////////////////////////////////////////////////
router.put(
  "/:id",
  requireAuth,
  requireDoctor,
  vaccinesController.updateVaccine
);

//////////////////////////////////////////////////////
// 💉 DELETE VACCINE (Doctor only)
//////////////////////////////////////////////////////
router.delete(
  "/:id",
  requireAuth,
  requireDoctor,
  vaccinesController.deleteVaccine
);

//////////////////////////////////////////////////////
// 💉 GET VACCINES BY BABY
// Parent & Doctor
//////////////////////////////////////////////////////
router.get(
  "/:babyId",
  requireAuth,
  vaccinesController.getVaccinesByBaby
);

export default router;
