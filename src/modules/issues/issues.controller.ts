import { issuesServices } from "./issues.service";
import type { Response } from "express";

const createIssue = async (req: Request, res: Response) => {};
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
