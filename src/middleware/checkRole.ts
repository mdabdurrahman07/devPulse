import type { NextFunction, Request, Response } from "express";
import { role, type Role } from "../types/types";
import { sendResponse } from "../utils/sendResponse";

export const checkRole = (...roles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user?.role;
    if (!userRole || !roles.includes(userRole)) {
      return sendResponse(res, { message: "Forbidden", error: true }, 403);
    }
    next()
  };
};
