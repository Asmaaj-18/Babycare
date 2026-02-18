import { Response, NextFunction } from "express";
import { AuthRequest } from "../types/auth.types";

import { Role } from "@prisma/client";

export const requireRole =
  (...roles: Role[]) =>
  (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    next();
  };

export const requireParent = requireRole(Role.PARENT);
export const requireDoctor = requireRole(Role.DOCTOR);
