import fs from "fs/promises";
import path from "path";
import { exec } from "child_process";
import { promisify } from "util";

const run = promisify(exec);

export interface CommandResult {
  success: boolean;
  output: string;
}

export async function createSiteFolder(
  name: string
) {
  const root =
    process.env.SITES_ROOT ??
    "/srv/sites";

  const folder = path.join(root, name);

  await fs.mkdir(folder, {
    recursive: true,
  });

  await fs.mkdir(
    path.join(folder, "app"),
    {
      recursive: true,
    }
  );

  await fs.mkdir(
    path.join(folder, ".axiopanel"),
    {
      recursive: true,
    }
  );

  return folder;
}

async function execute(
  command: string,
  cwd: string
): Promise<CommandResult> {
  try {
    const { stdout, stderr } =
      await run(command, { cwd });

    return {
      success: true,
      output: stdout || stderr,
    };
  } catch (error: any) {
    return {
      success: false,
      output:
        error.stderr ??
        error.stdout ??
        error.message,
    };
  }
}

export async function buildSite(
  folder: string
) {
  return execute(
    "docker compose build --pull",
    folder
  );
}

export async function startSite(
  folder: string
) {
  return execute(
    "docker compose up -d --force-recreate",
    folder
  );
}

export async function stopSite(
  folder: string
) {
  return execute(
    "docker compose down",
    folder
  );
}

export async function restartSite(
  folder: string
) {
  await stopSite(folder);

  return startSite(folder);
}

export async function removeSite(
  folder: string
) {
  return execute(
    "docker compose down -v",
    folder
  );
}

export async function getLogs(
  folder: string
) {
  const result = await execute(
    "docker compose logs --tail=200",
    folder
  );

  return result.output;
}