import fs from "fs/promises";
import path from "path";
import { exec } from "child_process";
import { promisify } from "util";

const run = promisify(exec);

export async function cloneRepository(
  repository: string,
  destination: string,
  branch = "main"
) {
  await fs.mkdir(destination, {
    recursive: true,
  });

  await run(
    `git clone --branch ${branch} ${repository} .`,
    {
      cwd: destination,
    }
  );
}

export async function pullRepository(
  folder: string
) {
  await run("git pull", {
    cwd: folder,
  });
}

export async function repositoryExists(
  folder: string
) {
  try {
    await fs.access(
      path.join(folder, ".git")
    );

    return true;
  } catch {
    return false;
  }
}