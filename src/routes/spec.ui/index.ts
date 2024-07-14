import { swaggerUI } from "@hono/swagger-ui";
import type { App } from "../../base";

export function openApiUI(app: App, specPath: string) {
  app.get(`${specPath}/ui`, swaggerUI({ url: specPath }));
}
