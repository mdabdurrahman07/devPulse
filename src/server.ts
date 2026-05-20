import app from "./app";
import config from "./config/env.config";

const port = config.port;
export const main = () => {
  app.listen(port, () => {
    console.log(`DevPulse Server is running on ${port}`);
  });
};

main();
