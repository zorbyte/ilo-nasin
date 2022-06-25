import { join } from "path";

import { Application, json, Router, static as serveStatic } from "express";

export function registerRoutes(app: Application) {
  registerViewRoutes(app);
  registerAPIRoutes(app);
}

function registerViewRoutes(app: Application) {
  const router = Router();

  router.use("/static", serveStatic(join(process.cwd(), "static")));
  router.use("/static/js", serveStatic(join(process.cwd())));

  router.get("/", (_req, res) => {
    res.render("index");
  });

  app.use(router);
}

function registerAPIRoutes(app: Application) {
  const router = Router();

  router.use(json());

  // create a user.
  router.post("/user");

  // edit user nickname (use body to specify)
  // authorisation will determine the user in question.
  router.patch("/user/@me");

  // terminate the account and all associated nasins.
  // this will not terminate forks.
  router.delete("/user/@me");

  // create a nasin.
  router.post("/nasin");

  // get a nasin
  router.get("/nasin/:id");

  // edit a nasin
  router.patch("/nasin/:id");

  // delete a nasin
  router.delete("/nasin/:id");

  // pin a nasin.
  router.put("/nasin/:id/pin");

  // unpin a nasin.
  router.delete("/nasin/:id/pin");

  app.use("/api", router);
}
