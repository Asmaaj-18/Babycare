import { Response, NextFunction } from "express";
import { AuthRequest } from "../types/auth.types";

import { prisma } from "../prisma/prisma";

//////////////////////////////////////////////////////
// CREATE BABY (Parent)
//////////////////////////////////////////////////////
export const createBaby = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { name, birthDate, gender } = req.body;

    const baby = await prisma.baby.create({
      data: {
        name,
        birthDate: new Date(birthDate),
        gender,
        parentId: req.user!.id,
      },
    });

    res.status(201).json(baby);
  } catch {
    res.status(500).json({ message: "Error creating baby" });
  }
};

//////////////////////////////////////////////////////
// GET BABIES
//////////////////////////////////////////////////////
export const getBabies = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (req.user!.role === "PARENT") {
      const babies = await prisma.baby.findMany({
        where: { parentId: req.user!.id },
      });
      return res.json(babies);
    }

    const babies = await prisma.baby.findMany();
    res.json(babies);
  } catch {
    res.status(500).json({ message: "Error fetching babies" });
  }
};

//////////////////////////////////////////////////////
// GET BABY BY ID
//////////////////////////////////////////////////////
export const getBabyById = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const baby = await prisma.baby.findUnique({
      where: { id: req.params.id as string },
    });

    if (!baby) return res.status(404).json({ message: "Not found" });

    if (
      req.user!.role === "PARENT" &&
      baby.parentId !== req.user!.id
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.json(baby);
  } catch {
    res.status(500).json({ message: "Error" });
  }
};

//////////////////////////////////////////////////////
// UPDATE BABY
//////////////////////////////////////////////////////
export const updateBaby = async (req: AuthRequest, res: Response) => {
  try {
    const baby = await prisma.baby.findUnique({
      where: { id: req.params.id as string },
    });

    if (!baby) return res.status(404).json({ message: "Not found" });

    if (baby.parentId !== req.user!.id)
      return res.status(403).json({ message: "Access denied" });

    const updated = await prisma.baby.update({
      where: { id: baby.id },
      data: req.body,
    });

    res.json(updated);
  } catch {
    res.status(500).json({ message: "Error updating baby" });
  }
};

//////////////////////////////////////////////////////
// DELETE BABY
//////////////////////////////////////////////////////
export const deleteBaby = async (req: AuthRequest, res: Response) => {
  try {
    const baby = await prisma.baby.findUnique({
      where: { id: req.params.id as string },
    });

    if (!baby) return res.status(404).json({ message: "Not found" });

    if (baby.parentId !== req.user!.id)
      return res.status(403).json({ message: "Access denied" });

    await prisma.baby.delete({ where: { id: baby.id } });

    res.json({ message: "Baby deleted" });
  } catch {
    res.status(500).json({ message: "Error deleting baby" });
  }
};

//////////////////////////////////////////////////////
// FULL DASHBOARD
//////////////////////////////////////////////////////
export const getFullDashboard = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const id = req.params.id as string;

    const baby = await prisma.baby.findUnique({
      where: { id },
      include: {
        sleep: true,
        growth: true,
        vaccines: true,

        comments: {
          where:
            req.user?.role === "PARENT"
              ? { author: { role: "DOCTOR" } } // 🔥 filtre ici
              : undefined,
          include: {
            author: {
              select: {
                name: true,
                role: true,
              },
            },
          },
        },
      },
    });

    if (!baby) {
      return res.status(404).json({ message: "Baby not found" });
    }

    res.json(baby);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch dashboard" });
  }
};
