import config from "../config/env.config";
import jwt from "jsonwebtoken";
import type { PUser } from "../types/types";

export const verifyToken = (token: string, type: "access" | "refresh") => {
  const secret =
    type === "refresh" ? config.jwt_refreshToken : config.jwt_accessToken;
  const decoded = jwt.verify(token, secret);
  return decoded;
};

export const signToken = (payload: PUser) => {
  const accessToken = jwt.sign(payload, config.jwt_accessToken, {
    expiresIn: "1d",
  });
  const refreshToken = jwt.sign(payload, config.jwt_refreshToken, {
    expiresIn: "7d",
  });
  return { accessToken, refreshToken };
};
