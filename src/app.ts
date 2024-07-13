import { Hono } from "hono";
import type { AppContext } from "./context";

export interface CreateAppOptions {
  basePath?: string;
}

const defaultOptions: CreateAppOptions = {
  basePath: "/",
};

export function createApp(options: CreateAppOptions = defaultOptions) {
  const { basePath = "/" } = options;

  const app = new Hono<AppContext>().basePath(basePath);

  // TODO: middleware

  // TODO: error handling

  // health check
  app.get("/status", (c) =>
    c.json({
      ok: true,
    })
  );

  return app;
}
