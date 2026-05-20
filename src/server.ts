import app from "./app";
import config from "./config/env.config";
import { initDB } from "./db/dbConnection";

const port = config.port;
export const main = () => {
  // db
  initDB()
  app.listen(port, () => {
    console.log(`DevPulse Server is running on ${port}`);
  });
};

main();
