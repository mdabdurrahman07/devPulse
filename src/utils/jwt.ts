import config from "../config/env.config";
import jwt from "jsonwebtoken";
import type { PUser } from "../types/types";

export const verifyToken = (token:string) => {
  const secret = config.jwt_accessToken;
  const decoded = jwt.verify(token, secret);
  return decoded;
};

export const signToken = (payload: PUser) => {
  const accessToken = jwt.sign(payload, config.jwt_accessToken, {
    expiresIn: "7d",
  });
  return { accessToken };
};
