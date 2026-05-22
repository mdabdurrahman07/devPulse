import app from "./app";
import config from "./config/env.config";
import { initDB } from "./db/dbConnection";

initDB();

if (config.node_env !== "production") {
  const port = config.port;
  app.listen(port, () => {
    console.log(`DevPulse Server is running on ${port}`);
  });
}

export default app;
