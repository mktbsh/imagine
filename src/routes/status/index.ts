import { createHono } from "../../base";

export const status = createHono();

status.get("/", async (c) => {
  return c.json({
    ok: true,
  });
});
