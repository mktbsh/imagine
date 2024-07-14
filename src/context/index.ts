import type { Context, Env } from "hono";

export const CONTEXT_KEYS = {
  REQUEST_ID: "requestId",
} as const;

export interface AppContext extends Env {
  Variables: {
    [CONTEXT_KEYS.REQUEST_ID]: string;
  };
}

export function getRequestId(c: Context<AppContext>): string {
  return c.get(CONTEXT_KEYS.REQUEST_ID);
}
