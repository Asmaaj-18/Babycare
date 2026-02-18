import { Request, Response } from "express";
import { prisma } from "../prisma/prisma";

//////////////////////////////////////////////////////
// CREATE VACCINE (Doctor)
//////////////////////////////////////////////////////
export const createVaccine = async (req: Request, res: Response) => {
  try {
    const { name, date, status, note, babyId } = req.body;

    const baby = await prisma.baby.findUnique({
      where: { id: babyId as string },
    });

    if (!baby) {
      return res.status(404).json({ message: "Baby not found" });
    }

    const vaccine = await prisma.vaccine.create({
      data: {
        name,
        date: new Date(date),
        status,
        note,
        babyId,
      },
    });

    return res.status(201).json(vaccine);
  } catch {
    return res.status(500).json({ message: "Error creating vaccine" });
  }
};

//////////////////////////////////////////////////////
// UPDATE VACCINE (Doctor)
//////////////////////////////////////////////////////
export const updateVaccine = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    const vaccine = await prisma.vaccine.update({
      where: { id },
      data: req.body,
    });

    return res.json(vaccine);
  } catch {
    return res.status(500).json({ message: "Error updating vaccine" });
  }
};

//////////////////////////////////////////////////////
// DELETE VACCINE (Doctor)
//////////////////////////////////////////////////////
export const deleteVaccine = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    await prisma.vaccine.delete({
      where: { id },
    });

    return res.json({ message: "Vaccine deleted" });
  } catch {
    return res.status(500).json({ message: "Error deleting vaccine" });
  }
};

//////////////////////////////////////////////////////
// GET VACCINES BY BABY
//////////////////////////////////////////////////////
export const getVaccinesByBaby = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const babyId = req.params.babyId as string;

    const baby = await prisma.baby.findUnique({
      where: { id: babyId },
    });

    if (!baby) {
      return res.status(404).json({ message: "Baby not found" });
    }

    if (
      user &&
      user.role === "PARENT" &&
      baby.parentId !== user.id
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    const vaccines = await prisma.vaccine.findMany({
      where: { babyId: baby.id },
    });

    return res.json(vaccines);
  } catch {
    return res.status(500).json({ message: "Error fetching vaccines" });
  }
};
