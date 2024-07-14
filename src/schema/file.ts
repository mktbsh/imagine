import { z } from "@hono/zod-openapi";

const KIB = 1024;

const MAX_SIZE_MB = 5;
const MAX_FILE_SIZE = MAX_SIZE_MB * KIB ** 2;

const baseSchema = z
  .instanceof(File)
  .refine(
    (file) => file.size <= MAX_FILE_SIZE,
    `file size is too large. size <= ${MAX_SIZE_MB}MB`
  );

export function createFileSchema(accepts: ReadonlyArray<string>) {
  return baseSchema.refine(
    (file) => accepts.includes(file.type),
    "Uploaded file type is not allowed"
  );
}
