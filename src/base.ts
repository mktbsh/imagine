import { Hono } from "hono";
import type { BlankSchema } from "hono/types";
import type { AppContext } from "./context";

export function createHono(): Hono<AppContext, BlankSchema, "/"> {
  return new Hono<AppContext>();
}
