import { Response, NextFunction } from "express";
import { AuthRequest } from "../types/auth.types";
import jwt from "jsonwebtoken";
import { Role } from "@prisma/client";

interface JwtPayload {
  id: string;
  role: Role;
}

export const requireAuth = (
  req: AuthRequest, res: Response, next: NextFunction

) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Access token required" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as JwtPayload;

    req.user = {
      id: decoded.id,
      role: decoded.role,
    };

    next();
  } catch {
    return res.status(403).json({
      message: "Invalid or expired token",
    });
  }
};
