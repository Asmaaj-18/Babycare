import { Response, NextFunction } from "express";
import { AuthRequest } from "../types/auth.types";

import { prisma } from "../prisma/prisma";

//////////////////////////////////////////////////////
// CREATE COMMENT (Doctor)
//////////////////////////////////////////////////////
export const createComment = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { content, babyId } = req.body;

    const baby = await prisma.baby.findUnique({
      where: { id: babyId },
    });

    if (!baby)
      return res.status(404).json({ message: "Baby not found" });

    const comment = await prisma.comment.create({
      data: {
        content,
        babyId,
        authorId: req.user!.id,
      },
    });

    res.status(201).json(comment);
  } catch {
    res.status(500).json({ message: "Error creating comment" });
  }
};

//////////////////////////////////////////////////////
// GET COMMENTS BY BABY
//////////////////////////////////////////////////////
export const getCommentsByBaby = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const baby = await prisma.baby.findUnique({
      where: { id: req.params.id as string },
    });

    if (!baby)
      return res.status(404).json({ message: "Baby not found" });

    if (
      req.user!.role === "PARENT" &&
      baby.parentId !== req.user!.id
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    const comments = await prisma.comment.findMany({
      where: { babyId: baby.id },
      include: {
        author: {
          select: { id: true, name: true, role: true },
        },
      },
    });

    res.json(comments);
  } catch {
    res.status(500).json({ message: "Error fetching comments" });
  }
};

//////////////////////////////////////////////////////
// DELETE COMMENT (Doctor)
//////////////////////////////////////////////////////
export const deleteComment = async (req: AuthRequest, res: Response) => {
  try {
    await prisma.comment.delete({
      where: { id: req.params.id as string },
    });

    res.json({ message: "Comment deleted" });
  } catch {
    res.status(500).json({ message: "Error deleting comment" });
  }
};
