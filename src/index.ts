import "reflect-metadata";
import "dotenv/config";

import { connectToDatabase } from "./driver.js";
import { startServer } from "./server.js";

await bootstrap();

async function bootstrap() {
  await connectToDatabase().catch(err =>
    fail("failed to connect to database", err)
  );

  await startServer().catch(err => fail("failed to start server", err));
}

function fail(reason: string, error: unknown) {
  console.error(reason, error);
  process.exit(1);
}
