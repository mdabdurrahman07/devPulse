import { sendResponse } from "../../utils/sendResponse";
import { issuesServices } from "./issues.service";
import type { Request, Response } from "express";

const createIssue = async (req: Request, res: Response) => {
  const body = req.body;
  const reporter_id = req.user?.id
  try {
    const result = await issuesServices.createIssueIntoDB({
      ...body, reporter_id
    });
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
const getAllIssues = async (req: Request, res: Response) => {
  try {
    const result = await issuesServices.getAllIssuesFromDB()
    sendResponse(res, {
      message: "All issues retrieved successfully",
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
const getSingleIssue = async (req: Request, res: Response) => {};
const updateIssue = async (req: Request, res: Response) => {};
const deleteIssue = async (req: Request, res: Response) => {};

export const issuesController = {
  createIssue,
  getAllIssues,
  getSingleIssue,
  updateIssue,
  deleteIssue,
};
