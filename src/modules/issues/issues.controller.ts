import { sendResponse } from "../../utils/sendResponse";
import { issuesServices } from "./issues.service";
import type { Request, Response } from "express";

const createIssue = async (req: Request, res: Response) => {
  const body = req.body;
  const reporter_id = req.user?.id;
  try {
    const result = await issuesServices.createIssueIntoDB({
      ...body,
      reporter_id,
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
    const result = await issuesServices.getAllIssuesFromDB(req.query);
    sendResponse(res, {
      message: "All issues retrieved successfully",
      error: false,
      data: result,
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
const getSingleIssue = async (req: Request, res: Response) => {
  const id = req.user?.id;
  try {
    const result = await issuesServices.getSingleIssuesFromDB(id as string);
    sendResponse(res, {
      message: "Single Issue retrieved",
      error: false,
      data: result.rows[0],
    });
  } catch (error) {
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
const updateIssue = async (req: Request, res: Response) => {};
const deleteIssue = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return sendResponse(res, { message: "Unauthorized", error: true }, 401);
  }
  try {
    const result = await issuesServices.deleteIssueFromDB(id as string);
    if (!result) {
      sendResponse(res, {
        message: "failed to delete issue",
        error: true,
        err: result,
      });
    }
    sendResponse(res, { message: "Issue deleted successfully", error: false });
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

export const issuesController = {
  createIssue,
  getAllIssues,
  getSingleIssue,
  updateIssue,
  deleteIssue,
};
