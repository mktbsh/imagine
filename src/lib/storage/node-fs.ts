import { type PathLike, existsSync, mkdirSync } from "node:fs";
import fs from "node:fs/promises";
import path from "node:path";
import { fileTypeFromBuffer } from "file-type";
import type { FileStorage } from "./types";

const FS_DIR = path.resolve(process.cwd(), "local-imagine-data-bucket");

function mkDirIfNotExists(path: PathLike) {
  if (existsSync(path)) return;
  fs.mkdir(path, { recursive: true });
}

function mkDirSyncIfNotExists(path: PathLike) {
  if (existsSync(path)) return;
  mkdirSync(path, { recursive: true });
}

export function initNodeFS(): FileStorage {
  mkDirSyncIfNotExists(FS_DIR);

  const putObject: FileStorage["putObject"] = async (key, file) => {
    const paths = key.split("/");

    const hasDir = paths.length > 1;
    if (hasDir) {
      const dirPath = path.resolve(
        FS_DIR,
        paths.slice(0, paths.length - 1).join("/")
      );
      await mkDirIfNotExists(dirPath);
    }

    const dst = path.resolve(FS_DIR, key);
    const buffer = await file.arrayBuffer();
    return await fs.writeFile(dst, new Uint8Array(buffer));
  };

  const getObject: FileStorage["getObject"] = async (key) => {
    const filePath = path.resolve(FS_DIR, key);
    if (!existsSync(filePath)) return;
    const buffer = await fs.readFile(filePath);
    const fileType = await fileTypeFromBuffer(buffer);
    if (!fileType) return;

    return new Blob([buffer], { type: fileType.mime });
  };

  return {
    putObject,
    getObject,
  };
}
