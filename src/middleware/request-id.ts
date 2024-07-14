import { createMiddleware } from "hono/factory";
import { type AppContext, CONTEXT_KEYS } from "../context";

export const requestId = createMiddleware<AppContext>(async (c, next) => {
  c.set(CONTEXT_KEYS.REQUEST_ID, crypto.randomUUID());
  await next();
});
