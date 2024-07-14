export interface TagObject {
  name: string;
  description?: string;
  externalDocs?: {
    description?: string;
    url: string;
  };
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  [extension: string]: any;
}

export const openApiTags: Array<TagObject> = [
  {
    name: "Context",
    description: "for service information",
  },
] as const;
