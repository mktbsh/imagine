import { OpenAPIHono } from "@hono/zod-openapi";
import type { BlankSchema } from "hono/types";
import type { AppContext } from "./context";

export type App = OpenAPIHono<AppContext, BlankSchema, "/">;

export function createHono(): App {
  return new OpenAPIHono<AppContext>();
}
