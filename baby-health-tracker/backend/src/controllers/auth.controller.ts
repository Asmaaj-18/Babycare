import { Request, Response } from "express";
import { prisma } from "../prisma/prisma";
import { Role } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//////////////////////////////////////////////////////
// 📝 REGISTER
//////////////////////////////////////////////////////
export const register = async (req: Request, res: Response) => {
  try {
    const {
      name,
      email,
      password,
      role,
      babyName,
      babyBirthDate,
      babyGender,
    } = req.body;

    // Vérifier si email existe
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: "Email already used" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //////////////////////////////////////////////////////
    // 👩‍👦 REGISTER PARENT
    //////////////////////////////////////////////////////
if (role === "PARENT") {
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: Role.PARENT,
    },
  });

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );

  return res.status(201).json({ token, user });
}
    //////////////////////////////////////////////////////
    // 👨‍⚕️ REGISTER DOCTOR
    //////////////////////////////////////////////////////
    if (role === "DOCTOR") {
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role: Role.DOCTOR,
        },
      });

      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET!,
        { expiresIn: "7d" }
      );

      return res.status(201).json({ token, user });
    }

    return res.status(400).json({ message: "Invalid role" });
  } catch (error) {
    res.status(500).json({ message: "Registration failed" });
  }
};

//////////////////////////////////////////////////////
// 🔑 LOGIN
//////////////////////////////////////////////////////
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        babies: true,
      },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
};
