import { createHono } from "./base";
import { handleError } from "./error-handler";
import { registerMiddlewares } from "./middleware";
import { openAPIRoute } from "./routes/spec";
import { statusAPI } from "./routes/status";
import { uploadAPI } from "./routes/upload";

export interface CreateAppOptions {
  basePath?: string;
}

const defaultOptions: CreateAppOptions = {
  basePath: "/",
};

export function createApp(options: CreateAppOptions = defaultOptions) {
  const { basePath = "/" } = options;

  const app = createHono().basePath(basePath);

  registerMiddlewares(app);
  app.onError(handleError);

  openAPIRoute("/spec", app);
  app.route("/status", statusAPI);
  app.route("/upload", uploadAPI);

  return app;
}
