import { pool } from "../../db/dbConnection";
import type { PUser } from "../../types/types";
import type { User } from "./auth.interface";
import bcrypt from "bcryptjs";

const createUserIntoDB = async (payload: User) => {
  const { name, email, password, role } = payload;
  const hashPassword = await bcrypt.hash(password, 10);
  const result = await pool.query(
    `INSERT INTO users(name, email, password, role)
    VALUES($1,$2,$3,COALESCE($4, 'contributor'))
    RETURNING *
    `,
    [name, email, hashPassword, role],
  );
  delete result.rows[0].password;
  return result;
};
const validateUser = async (email: string, password: string) => {
  const result = await pool.query(
    `SELECT * FROM users WHERE email=$1
    `,
    [email],
  );
  if (!result.rows.length) {
    return null;
  }
  const { password: hashPassword, ...user } = result.rows[0];
  const isValid = await bcrypt.compare(password, hashPassword);
  return isValid ? user : null;
};
const getUserById = async (id: string) => {
  const result = await pool.query(
    `
    SELECT * users WHERE id=$1
    `,
    [id],
  );
  return result.rows[0] as PUser & { id: string };
};

export const authServices = {
  createUserIntoDB,
  validateUser,
  getUserById
};
