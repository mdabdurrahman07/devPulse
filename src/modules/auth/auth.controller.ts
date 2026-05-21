import type { Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import { authServices } from "./auth.service";
import { signToken } from "../../utils/jwt";

const registerUser = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const result = await authServices.createUserIntoDB(body);
    sendResponse(
      res,
      {
        message: "User registered successfully",
        error: false,
        data: result.rows[0],
      },
      201,
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      sendResponse(
        res,
        { message: error.message, error: true, err: error },
        400,
      );
    } else {
      sendResponse(res, {
        message: "An unexpected error occurred",
        error: true,
        err: error,
      });
    }
  }
};
const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await authServices.validateUser(email, password);
  if (!user) {
    return sendResponse(
      res,
      { message: "Invalid email or password", error: true, err: user },
      401,
    );
  }
  try {
    const { accessToken, refreshToken } = signToken(user);
    res.cookie("refreshToken", refreshToken, {
      secure: false,
      httpOnly: true,
      sameSite: "lax",
    });
    const result = {
      token: accessToken,
      user: user,
    };
    sendResponse(
      res,
      { message: "Login successful", error: false, data: result },
      200,
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      sendResponse(
        res,
        { message: error.message, error: true, err: error },
        400,
      );
    } else {
      sendResponse(res, {
        message: "An unexpected error occurred",
        error: true,
        err: error,
      });
    }
  }
};

export const authController = {
  registerUser,
  loginUser,
};
