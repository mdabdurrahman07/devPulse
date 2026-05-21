import { sendResponse } from "../../utils/sendResponse";
import { issuesServices } from "./issues.service";
import type { Request, Response } from "express";

const createIssue = async (req: Request, res: Response) => {
  const body = req.body;
  try {
    const result = await issuesServices.createIssueIntoDB(body);
    sendResponse(res, {
      message: "Issue created successfully",
      error: false,
      data: result.rows[0],
    });
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
const getAllIssue = async (req: Request, res: Response) => {};
const getSingleIssue = async (req: Request, res: Response) => {};
const updateIssue = async (req: Request, res: Response) => {};
const deleteIssue = async (req: Request, res: Response) => {};

export const issuesController = {
  createIssue,
  getAllIssue,
  getSingleIssue,
  updateIssue,
  deleteIssue,
};
