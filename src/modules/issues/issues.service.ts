import { pool } from "../../db/dbConnection";
import type { IssuesQuery } from "../../types/types";
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
const getAllIssuesFromDB = async (query: IssuesQuery) => {
  const { sort = "newest", type, status } = query;
  const conditions: string[] = [];
  const values: string[] = [];
  let index = 1;
  //* filtering types
  if (type) {
    conditions.push(`type = $${index}`);
    values.push(type);
    index++;
  }
  //* filtering status
  if (status) {
    conditions.push(`status = $${index}`);
    values.push(status);
    index++;
  }
  //! normal query
  let SQL = `SELECT * FROM issues`;

  //! query
  if (conditions.length > 0) {
    SQL += ` WHERE ${conditions.join(" AND ")}`;
  }
  //! sorts
  if (sort === "oldest") {
    SQL += ` ORDER BY created_at ASC`;
  } else {
    SQL += ` ORDER BY created_at DESC`;
  }

  const fetchedIssues = await pool.query(SQL, values);
  const issues = fetchedIssues.rows;

  //* extracting unique reporter_ids
  const reporterIds = [...new Set(issues.map((issue) => issue.reporter_id))];
  if (reporterIds.length === 0) {
    return [];
  }
  //* fetch reporters
  const usersQuery = await pool.query(
    `SELECT id, name, role FROM users WHERE id= ANY($1)`,
    [reporterIds],
  );

  const users = usersQuery.rows;

  // ! user mapping
  const userMap = users.reduce(
    (acc, user) => {
      acc[user.id] = user;
      return acc;
    },
    {} as Record<number, any>,
  );

  const result = issues.map((issue) => ({
    id: issue.id,
    title: issue.title,
    description: issue.description,
    type: issue.type,
    status: issue.status,

    reporter: userMap[issue.reporter_id] || null,
    created_at: issue.created_at,
    updated_at: issue.updated_at,
  }));

  return result;
};
const getSingleIssuesFromDB = async (id: string) => {
  const user = await authServices.getUserById(id);
  if (!user) {
    throw new Error("user not found");
  }
  const result = pool.query(
    `SELECT
    `,
  );
};
const updateIssueFromDB = async () => {};
const deleteIssueFromDB = async (id: string) => {
  const result = pool.query(
    `DELETE FROM issues WHERE id=$1
    `,
    [id],
  );
  return result;
};

export const issuesServices = {
  createIssueIntoDB,
  getAllIssuesFromDB,
  getSingleIssuesFromDB,
  updateIssueFromDB,
  deleteIssueFromDB,
};
