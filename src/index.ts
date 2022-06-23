import "reflect-metadata";
import "dotenv/config";

import { initErrorLog } from "./lib/error";
import { connectToDatabase } from "./driver";
import { startServer } from "./server";

void initErrorLog()
  .catch(err => {
    console.error(
      "fatal error, failed to initialise error log, killing process",
      err
    );

    process.exit(1);
  })
  .then(connectToDatabase)
  .then(startServer)
  .catch();
