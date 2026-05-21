import type { NextFunction, Request, Response } from "express";
import { sendResponse } from "../utils/sendResponse";
import { verifyToken } from "../utils/jwt";
import { authServices } from "../modules/auth/auth.service";
import type { PUser } from "../types/types";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return sendResponse(
        res,
        { message: "Access token is missing", error: true },
        401,
      );
    }
    const payload = verifyToken(token) as PUser;
    if (!payload) {
      return sendResponse(
        res,
        { message: "Invalid access token", error: true },
        401,
      );
    }
    const user = await authServices.getUserById(payload.id);
    if (!user) {
      return sendResponse(res, { message: "Forbidden", error: true }, 403);
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};