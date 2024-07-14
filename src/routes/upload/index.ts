import { createRoute, z } from "@hono/zod-openapi";
import sharp from "sharp";
import { createHono } from "../../base";
import { digestHex } from "../../lib/hash";
import { useStorage } from "../../lib/storage";
import type { FileStorage } from "../../lib/storage/types";
import { createFileSchema } from "../../schema/file";

const UploadResult = z.object({
  ok: z.boolean(),
  key: z.string(),
});

const ImageFileSchema = createFileSchema([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
]);

const UploadRequestBodySchema = z
  .object({
    file: ImageFileSchema,
  })
  .openapi("UploadRequestBody");

const postUpload = createRoute({
  path: "/",
  method: "post",
  description: "Upload image",
  tags: ["Image"],
  requestBody: {
    description: "",
    required: true,
    content: {
      "multipart/form-data": {
        schema: {
          type: "object",
          properties: {
            file: {
              type: "string",
              format: "binary",
            },
          },
          required: ["file"],
        },
      },
    },
  },
  responses: {
    200: {
      description: "Status code is always 200 OK.",
      content: {
        "application/json": {
          schema: UploadResult,
        },
      },
    },
    400: {
      description: "Error",
      content: {
        "application/json": {
          schema: z.object({
            error: z.object({
              code: z.string(),
              message: z.string(),
            }),
          }),
        },
      },
    },
  },
});

export const uploadAPI = createHono();

interface SaveAsOptions {
  image: sharp.Sharp;
  storage: FileStorage;
  key: string;
  format: "avif" | "webp";
}

async function saveAs({ image, storage, key, format }: SaveAsOptions) {
  const bin = await image.toFormat(format).toBuffer();
  await storage.putObject(key, new Blob([bin], { type: `image/${format}` }));
}

uploadAPI.openapi(
  postUpload,
  async (c) => {
    const body = await c.req.parseBody();
    const { file } = await UploadRequestBodySchema.parseAsync(body);

    const storage = useStorage();

    const buffer = await file.arrayBuffer();
    const image = sharp(buffer);
    const hex = await digestHex(new Uint8Array(buffer));
    const timestamp = Date.now();

    const objectKey = (format: string) => `${hex}/${timestamp}.${format}`;
    const key = objectKey(file.type.replace("image/", ""));

    await Promise.allSettled([
      storage.putObject(key, file),
      file.type.includes("webp")
        ? []
        : saveAs({
            image,
            storage,
            key: objectKey("webp"),
            format: "webp",
          }),
      file.type.includes("avif")
        ? []
        : saveAs({
            image,
            storage,
            key: objectKey("avif"),
            format: "avif",
          }),
    ]);

    return c.json(
      {
        ok: true,
        key: key,
      },
      200
    );
  },
  (result, c) => {
    if (!result.success) {
      return c.json(
        {
          error: {
            code: "BAD_REQUEST",
            message: "error",
          },
        },
        400
      );
    }
  }
);
