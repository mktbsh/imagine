import { createHono } from "./base";
import { handleError } from "./error-handler";
import { registerMiddlewares } from "./middleware";
import { status } from "./routes/status";

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

  app.route("/status", status);

  return app;
}
