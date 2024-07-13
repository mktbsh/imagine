import type { Context, Env } from "hono";

const REQUEST_ID = "requestId";

export interface AppContext extends Env {
  Variables: {
    [REQUEST_ID]: string;
  };
}

export function getRequestId(c: Context<AppContext>): string {
  return c.get(REQUEST_ID);
}
