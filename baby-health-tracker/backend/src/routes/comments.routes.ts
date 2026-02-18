import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware";
import { requireDoctor } from "../middleware/role.middleware";
import * as commentsController from "../controllers/comments.controller";

const router = Router();

router.post(
  "/",
  requireAuth,
  requireDoctor,
  commentsController.createComment
);

router.get(
  "/:babyId",
  requireAuth,
  commentsController.getCommentsByBaby
);

router.delete(
  "/:id",
  requireAuth,
  requireDoctor,
  commentsController.deleteComment
);

export default router;
