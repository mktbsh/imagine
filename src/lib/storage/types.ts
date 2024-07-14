export interface FileStorage {
  putObject: (key: string, file: Blob) => Promise<void>;
  getObject: (key: string) => Promise<Blob | undefined>;
  // deleteObject: (key: string) => Promise<void>;
  // listObjects: (keyPrefix?: string) => Promise<ReadonlyArray<string>>;
}
