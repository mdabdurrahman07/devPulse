import { Request } from "express";
import type { PUser } from "./types";
declare global {
  namespace Express {
    interface Request {
      user?: PUser;
    }
  }
}

export {};
