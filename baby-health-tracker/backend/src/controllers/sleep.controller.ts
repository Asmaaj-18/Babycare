import { Request, Response } from "express";
import { prisma } from "../prisma/prisma";

export const createSleep = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { startTime, endTime, note, babyId } = req.body;

    const baby = await prisma.baby.findUnique({
      where: { id: babyId as string },
    });

    if (!baby) {
      return res.status(404).json({ message: "Baby not found" });
    }

    if (baby.parentId !== user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    const sleep = await prisma.sleep.create({
      data: {
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        note,
        babyId,
      },
    });

    return res.status(201).json(sleep);
  } catch {
    return res.status(500).json({ message: "Error creating sleep" });
  }
};

export const updateSleep = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    const sleep = await prisma.sleep.update({
      where: { id },
      data: req.body,
    });

    return res.json(sleep);
  } catch (error) {
    return res.status(500).json({ message: "Error updating sleep" });
  }
};

export const deleteSleep = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    await prisma.sleep.delete({
      where: { id },
    });

    return res.json({ message: "Sleep deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting sleep" });
  }
};

export const getSleepByBaby = async (req: Request, res: Response) => {
  try {
    const babyId = req.params.babyId as string;

    const sleeps = await prisma.sleep.findMany({
      where: { babyId },
      orderBy: { startTime: "desc" },
    });

    return res.json(sleeps);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching sleep" });
  }
};
