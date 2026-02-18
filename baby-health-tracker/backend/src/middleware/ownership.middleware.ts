import { Response, NextFunction } from "express";
import { AuthRequest } from "../types/auth.types";
import { prisma } from "../prisma/prisma";

export const checkBabyOwnership = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const babyId = req.params.babyId || req.body.babyId;

    const baby = await prisma.baby.findUnique({
      where: { id: babyId },
    });

    if (!baby) {
      return res.status(404).json({ message: "Baby not found" });
    }

    if (
      req.user?.role === "PARENT" &&
      baby.parentId !== req.user.id
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    next();
  } catch {
    return res.status(500).json({
      message: "Ownership check failed",
    });
  }
};
