import { createRoute, z } from "@hono/zod-openapi";
import { createHono } from "../../base";

const responseSchema = z.object({
  ok: z.boolean(),
});

const getStatus = createRoute({
  path: "/",
  method: "get",
  description: "health check endpoint",
  tags: ["Context"],
  responses: {
    200: {
      description: "Status code is always 200 OK.",
      content: {
        "application/json": {
          schema: responseSchema,
        },
      },
    },
  },
});

export const statusAPI = createHono();

statusAPI.openapi(getStatus, (c) => {
  return c.json(
    {
      ok: true,
    },
    200
  );
});
