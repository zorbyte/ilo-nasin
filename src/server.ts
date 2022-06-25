import { renderFile } from "eta";
import express from "express";

import { registerRoutes } from "./routes.js";

export async function startServer() {
  const app = express();

  app.engine("eta", renderFile);
  app.set("view engine", "eta");
  app.set("views", "./views");

  const compression = await import("compression");
  app.use(compression.default());

  const helmet = await import("helmet");
  app.use(helmet.default());

  registerRoutes(app);

  return new Promise<void>((rs, rj) => {
    const server = app.listen(parseInt(process.env.PORT ?? "3000"));
    server.once("error", rj);
    server.once("listening", () => {
      server.removeListener("error", rj);
      rs();
    });
  });
}
