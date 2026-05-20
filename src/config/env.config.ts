import dotenv from "dotenv";
import path from "node:path";
import { env } from "node:process";

dotenv.config({
  path: path.join(process.cwd(), ".env"),
  quiet: true,
});

const config = {
  port: env.PORT,
};
export default config;
