import { Pool } from "pg";
import config from "../config/env.config";

export const pool = new Pool({
  connectionString: config.db_connection_string,
});
export const initDB = async () => {
  try {
    await pool.query(
      `CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            name VARCHAR(40) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password TEXT NOT NULL,
            role VARCHAR(20) NOT NULL DEFAULT 'contributor',
            created_at TIMESTAMP NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMP NOT NULL DEFAULT NOW()
        )
        `,
    );
    await pool.query(
      `CREATE TABLE IF NOT EXISTS issues(
            id SERIAL PRIMARY KEY,
            title VARCHAR(150) NOT NULL,
            description TEXT NOT NULL CHECK (LENGTH(description) >=20),
            type VARCHAR(50) NOT NULL CHECK (TYPE IN ('big', 'feature_request')),
            status VARCHAR(20) NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved')),
            reporter_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            created_at TIMESTAMP NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMP NOT NULL DEFAULT NOW()
        )
        `,
    );
    console.log("DB CONNECTED");
  } catch (error) {
    console.log("DB CONNECTION ERROR", error);
  }
};
