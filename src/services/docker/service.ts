import type Docker from "dockerode";

import { getDockerClient } from "./client";

import { exec } from "child_process";
import { promisify } from "util";

const run = promisify(exec);

import type {
  DockerContainer,
  DockerMount,
  DockerPort,
} from "@/types/docker";

export class DockerService {
  private docker: Docker;

  constructor() {
    this.docker = getDockerClient();
  }

  async startContainer(id: string) {
    const container = this.docker.getContainer(id);

    await container.start();
  }

  async stopContainer(id: string) {
    const container = this.docker.getContainer(id);

    await container.stop();
  }

  async restartContainer(id: string) {
    const container = this.docker.getContainer(id);

    await container.restart();
  }

  async deleteContainer(id: string) {
  const container = this.docker.getContainer(id);

  await container.remove({
    force: true,
  });
}

  async getContainerLogs(id: string) {
  const container = this.docker.getContainer(id);

  const logs = await container.logs({
    stdout: true,
    stderr: true,
    tail: 500,
  });

  return logs.toString("utf8");
}

async getContainerStats(id: string) {
  const container = this.docker.getContainer(id);

  const stats = await container.stats({
    stream: false,
  });

  const cpuDelta =
    stats.cpu_stats.cpu_usage.total_usage -
    stats.precpu_stats.cpu_usage.total_usage;

  const systemDelta =
    stats.cpu_stats.system_cpu_usage -
    stats.precpu_stats.system_cpu_usage;

  const cpu =
    systemDelta > 0
      ? (cpuDelta / systemDelta) *
        stats.cpu_stats.online_cpus *
        100
      : 0;

  return {
    cpu,

    memory: stats.memory_stats.usage,

    memoryLimit: stats.memory_stats.limit,
  };
}

  async getContainer(id: string): Promise<DockerContainer> {
    const container = this.docker.getContainer(id);

    const inspect = await container.inspect();

    return {
      id: inspect.Id,

      name: inspect.Name.replace("/", ""),

      image: inspect.Config.Image,

      state: inspect.State.Status as DockerContainer["state"],

      status: inspect.State.Status,

      created: Math.floor(
        new Date(inspect.Created).getTime() / 1000
      ),

      ports: Object.entries(
        inspect.NetworkSettings.Ports ?? {}
      ).map(([key, value]) => ({
        privatePort: Number(key.split("/")[0]),
        publicPort: value?.[0]?.HostPort
          ? Number(value[0].HostPort)
          : undefined,
        ip: value?.[0]?.HostIp,
        type: key.endsWith("/udp") ? "udp" : "tcp",
      })),

      mounts: inspect.Mounts.map(
        (mount): DockerMount => ({
          source: mount.Source,
          destination: mount.Destination,
          mode: mount.Mode,
          rw: mount.RW,
        })
      ),

      labels: inspect.Config.Labels ?? {},

      network: Object.keys(
        inspect.NetworkSettings.Networks ?? {}
      ),
    };
  }

    async buildCompose(folder: string) {
    const { stdout } = await run(
      "docker compose build --pull",
      {
        cwd: folder,
      }
    );

    return stdout;
  }

  async startCompose(folder: string) {
    const { stdout } = await run(
      "docker compose up -d --force-recreate",
      {
        cwd: folder,
      }
    );

    return stdout;
  }

  async stopCompose(folder: string) {
    const { stdout } = await run(
      "docker compose down",
      {
        cwd: folder,
      }
    );

    return stdout;
  }

  async restartCompose(folder: string) {
    await this.stopCompose(folder);

    return this.startCompose(folder);
  }

  async deleteCompose(folder: string) {
    const { stdout } = await run(
      "docker compose down -v --remove-orphans",
      {
        cwd: folder,
      }
    );

    return stdout;
  }

  async logsCompose(folder: string) {
    const { stdout } = await run(
      "docker compose logs --tail=500",
      {
        cwd: folder,
      }
    );

    return stdout;
  }

  async getContainers(): Promise<DockerContainer[]> {
    const containers = await this.docker.listContainers({
      all: true,
    });
    

    return containers.map((container) => ({
      id: container.Id,

      name: container.Names[0]?.replace("/", "") ?? "",

      image: container.Image,

      state: container.State as DockerContainer["state"],

      status: container.Status,

      created: container.Created,

      ports: (container.Ports ?? []).map(
        (port): DockerPort => ({
          ip: port.IP,
          privatePort: port.PrivatePort,
          publicPort: port.PublicPort,
          type: port.Type as "tcp" | "udp",
        })
      ),

      mounts: (container.Mounts ?? []).map(
        (mount): DockerMount => ({
          source: mount.Source,
          destination: mount.Destination,
          mode: mount.Mode,
          rw: mount.RW,
        })
      ),

      labels: container.Labels ?? {},

      network: Object.keys(
        container.NetworkSettings?.Networks ?? {}
      ),
    }));
  }
}

export const dockerService = new DockerService();