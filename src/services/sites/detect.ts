import fs from "fs/promises";
import path from "path";

export type DetectedProject =
  | "docker"
  | "nextjs"
  | "node"
  | "laravel"
  | "php"
  | "static";

async function exists(file: string) {
  try {
    await fs.access(file);
    return true;
  } catch {
    return false;
  }
}

export async function detectProjectType(
  folder: string
): Promise<DetectedProject> {
  if (
    await exists(
      path.join(folder, "Dockerfile")
    )
  ) {
    return "docker";
  }

  if (
    await exists(
      path.join(folder, "package.json")
    )
  ) {
    const pkg = JSON.parse(
      await fs.readFile(
        path.join(folder, "package.json"),
        "utf8"
      )
    );

    if (
      pkg.dependencies?.next ||
      pkg.devDependencies?.next
    ) {
      return "nextjs";
    }

    return "node";
  }

  if (
    await exists(
      path.join(folder, "artisan")
    )
  ) {
    return "laravel";
  }

  if (
    await exists(
      path.join(folder, "composer.json")
    )
  ) {
    return "php";
  }

  if (
    await exists(
      path.join(folder, "index.html")
    )
  ) {
    return "static";
  }

  throw new Error(
    "Impossible de détecter le type du projet."
  );
}