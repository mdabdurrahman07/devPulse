import { pool } from "../../db/dbConnection";
import { authServices } from "../auth/auth.service";
import type { Issues } from "./issues.interface";

const createIssueIntoDB = async (payload: Issues) => {
  const { title, description, type, reporter_id } = payload;
  const user = await authServices.getUserById(reporter_id);
  if (!user) {
    throw new Error("user not found");
  }
  const result = await pool.query(
    `INSERT INTO issues (title,description,type,reporter_id)
        VALUES($1,$2,$3,$4)
        RETURNING *
        `,
    [title, description, type, reporter_id],
  );
  return result;
};
const getAllIssuesFromDB = async () => {};
const getSingleIssuesFromDB = async () => {};
const updateIssueFromDB = async () => {};
const deleteIssueFromDB = async () => {};

export const issuesServices = {
  createIssueIntoDB,
  getAllIssuesFromDB,
  getSingleIssuesFromDB,
  updateIssueFromDB,
  deleteIssueFromDB,
};
