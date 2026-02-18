import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

//////////////////////////////////////////////////////
// 🔑 GENERATE TOKENS
//////////////////////////////////////////////////////
const generateAccessToken = (id: string, role: Role) => {
  return jwt.sign(
    { id, role },
    process.env.JWT_ACCESS_SECRET!,
    { expiresIn: "15m" }
  );
};

const generateRefreshToken = (id: string) => {
  return jwt.sign(
    { id },
    process.env.JWT_REFRESH_SECRET!,
    { expiresIn: "7d" }
  );
};

//////////////////////////////////////////////////////
// 📝 REGISTER
//////////////////////////////////////////////////////
export const registerService = async (data: any) => {
  const {
    name,
    email,
    password,
    role,
    babyName,
    babyBirthDate,
    babyGender,
  } = data;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("Email already used");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  if (role === "PARENT") {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: Role.PARENT,
        babies: {
          create: {
            name: babyName,
            birthDate: new Date(babyBirthDate),
            gender: babyGender,
          },
        },
      },
      include: { babies: true },
    });

    return {
      accessToken: generateAccessToken(user.id, user.role),
      refreshToken: generateRefreshToken(user.id),
      user,
    };
  }

  if (role === "DOCTOR") {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: Role.DOCTOR,
      },
    });

    return {
      accessToken: generateAccessToken(user.id, user.role),
      refreshToken: generateRefreshToken(user.id),
      user,
    };
  }

  throw new Error("Invalid role");
};

//////////////////////////////////////////////////////
// 🔐 LOGIN
//////////////////////////////////////////////////////
export const loginService = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
    include: { babies: true },
  });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    throw new Error("Invalid credentials");
  }

  return {
    accessToken: generateAccessToken(user.id, user.role),
    refreshToken: generateRefreshToken(user.id),
    user,
  };
};
