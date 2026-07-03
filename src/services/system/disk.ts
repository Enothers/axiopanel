import { exec } from "child_process";
import { promisify } from "util";

const execute = promisify(exec);

export async function getDiskUsage() {
  const { stdout } = await execute(
    "df -BG / | tail -1"
  );

  const parts = stdout.trim().split(/\s+/);

  return {
    total: parseInt(parts[1]),
    used: parseInt(parts[2]),
    available: parseInt(parts[3]),
    percent: parseInt(parts[4].replace("%", "")),
  };
}