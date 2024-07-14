import type { Hono, MiddlewareHandler } from "hono";
import { prettyJSON } from "hono/pretty-json";
import { secureHeaders } from "hono/secure-headers";
import { __PROD__ } from "../const";
import type { AppContext } from "../context";
import { requestId } from "./request-id";

export function registerMiddlewares(
  app: Hono<AppContext>,
  ...middlewares: MiddlewareHandler<AppContext>[]
): void {
  const musts = [requestId, secureHeaders()];
  const dev = __PROD__ ? [] : [prettyJSON()];

  for (const middleware of [...musts, ...dev, ...middlewares]) {
    app.use(middleware);
  }
}
