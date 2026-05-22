import dotenv from "dotenv";
import path from "node:path";
import { env } from "node:process";

dotenv.config({
  path: path.join(process.cwd(), ".env"),
  quiet: true,
});

const config = {
  port: env.PORT as string,
  db_connection_string: env.DB_CONNECTION_STRING as string,
  jwt_accessToken: env.JWT_ACCESS_SECRET_TOKEN as string,
  jwt_refreshToken: env.JWT_REFRESH_SECRET_TOKEN as string,
  node_env:env.NODE_ENV as string
};
export default config;
