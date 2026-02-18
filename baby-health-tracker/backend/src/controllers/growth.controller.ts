import { Response, NextFunction } from "express";
import { AuthRequest } from "../types/auth.types";

import { prisma } from "../prisma/prisma";

//////////////////////////////////////////////////////
// CREATE GROWTH
//////////////////////////////////////////////////////
export const createGrowth = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { weight, height, headSize, babyId } = req.body;

    const baby = await prisma.baby.findUnique({
      where: { id: babyId },
    });

    if (!baby)
      return res.status(404).json({ message: "Baby not found" });

    if (
      req.user!.role === "PARENT" &&
      baby.parentId !== req.user!.id
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    const growth = await prisma.growth.create({
      data: { weight, height, headSize, babyId },
    });

    res.status(201).json(growth);
  } catch {
    res.status(500).json({ message: "Error creating growth" });
  }
};

//////////////////////////////////////////////////////
// UPDATE GROWTH
//////////////////////////////////////////////////////
export const updateGrowth = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const growth = await prisma.growth.update({
      where: { id: req.params.id as string },
      data: req.body,
    });

    res.json(growth);
  } catch {
    res.status(500).json({ message: "Error updating growth" });
  }
};

//////////////////////////////////////////////////////
// DELETE GROWTH
//////////////////////////////////////////////////////
export const deleteGrowth = async (
  req: AuthRequest,
  res: Response
) => {  try {
    await prisma.growth.delete({
      where: { id: req.params.id as string },
    });

    res.json({ message: "Growth deleted" });
  } catch {
    res.status(500).json({ message: "Error deleting growth" });
  }
};

//////////////////////////////////////////////////////
// GET GROWTH BY BABY
//////////////////////////////////////////////////////
export const getGrowthByBaby = async (req: AuthRequest, res: Response) => {
  try {
    const baby = await prisma.baby.findUnique({
      where: { id: req.params.babyId as string }
    });

    if (!baby)
      return res.status(404).json({ message: "Baby not found" });

    if (
      req.user!.role === "PARENT" &&
      baby.parentId !== req.user!.id
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    const growth = await prisma.growth.findMany({
      where: { babyId: baby.id },
    });

    res.json(growth);
  } catch {
    res.status(500).json({ message: "Error fetching growth" });
  }
};
