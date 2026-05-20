import type { Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import { authServices } from "./auth.service";

const registerUser = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const result = await authServices.createUserIntoDB(body);
    sendResponse(res, {
      message: "User registered successfully",
      error: false,
      data: result.rows[0],
    },201);
  } catch (error: unknown) {
    console.log(error)
    if (error instanceof Error) {
      sendResponse(res, { message: error.message, error: true, err: error }, 400);
    } else {
      sendResponse(res, {
        message: "An unexpected error occurred",
        error: true,
        err: error,
      });
    }
  }
};
const loginUser = async () => {};

export const authController = {
  registerUser,
  loginUser,
};
