import fs from "fs/promises";
import path from "path";

export async function createEnvFile(
  folder: string,
  variables: Record<string, string> = {}
) {
  const content = Object.entries(variables)
    .map(([key, value]) => `${key}=${value}`)
    .join("\n");

  await fs.writeFile(
    path.join(folder, "app", ".env"),
    content
  );
}