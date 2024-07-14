import { initNodeFS } from "./node-fs";
import type { FileStorage } from "./types";

export function useStorage(): FileStorage {
  // TODO: runtime判定
  // if (runtime === "aws-lambda") {
  //   return initAwsS3();
  // }

  return initNodeFS();
}
