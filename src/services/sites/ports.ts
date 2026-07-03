import Docker from "dockerode";

const docker = new Docker({
  socketPath: "/var/run/docker.sock",
});

export async function isPortUsed(
  port: number
): Promise<boolean> {
  const containers =
    await docker.listContainers();

  for (const container of containers) {
    for (const p of container.Ports) {
      if (p.PublicPort === port) {
        return true;
      }
    }
  }

  return false;
}

export async function findAvailablePort(
  start = 3000
): Promise<number> {
  let port = start;

  while (await isPortUsed(port)) {
    port++;
  }

  return port;
}