import pkg from "../../../package.json";
import type { App } from "../../base";
import { openApiTags } from "../../const/tags";
import { openApiUI } from "../spec.ui";

export function openAPIRoute(path: string, app: App) {
  app.doc(path, (c) => ({
    openapi: "3.1.0",
    info: {
      version: pkg.version,
      title: "Imagine API",
      description: "Image Proxy API",
    },
    tags: openApiTags,
    servers: [
      {
        url: new URL(c.req.url).origin,
      },
    ],
  }));

  openApiUI(app, path);
}
