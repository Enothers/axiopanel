import { NextResponse } from "next/server";
import { getDiskUsage } from "@/services/system/disk";
import { getServicesStatus } from "@/services/system/services";
import os from "os";
import fs from "fs/promises";

export async function GET() {
  const totalMemory = os.totalmem();
  const freeMemory = os.freemem();

  const usedMemory = totalMemory - freeMemory;

  const cpus = os.cpus();

  const cpuLoad =
    cpus.reduce(
      (acc, cpu) => acc + cpu.times.user + cpu.times.sys,
      0
    ) /
    cpus.reduce(
      (acc, cpu) =>
        acc +
        cpu.times.user +
        cpu.times.sys +
        cpu.times.idle,
      0
    );

    const disk = await getDiskUsage();

    const osRelease = await fs.readFile(
  "/etc/os-release",
  "utf8"
);

const services =
  await getServicesStatus();

const prettyName =
  osRelease
    .split("\n")
    .find((line) => line.startsWith("PRETTY_NAME="))
    ?.replace("PRETTY_NAME=", "")
    .replace(/"/g, "") ?? "Linux";

  return NextResponse.json({
  cpu: Math.round(cpuLoad * 100),

  memory: {
    used: Math.round(
      usedMemory / 1024 / 1024 / 1024
    ),
    total: Math.round(
      totalMemory / 1024 / 1024 / 1024
    ),
  },

  disk,

  uptime: Math.round(os.uptime()),

  hostname: os.hostname(),

  platform: prettyName,

  cores: os.cpus().length,

  load: os.loadavg(),

  services,
});
}