const { subtle } = globalThis.crypto;

export async function digest(data: Uint8Array, algorithm = "SHA-256") {
  const digest = await subtle.digest(algorithm, data);
  return digest;
}

export async function digestHex(data: Uint8Array, algorithm = "SHA-256") {
  const buffer = await digest(data, algorithm);
  return Buffer.from(buffer).toString("hex");
}
