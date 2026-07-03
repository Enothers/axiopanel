import Docker from "dockerode";

let docker: Docker | null = null;

export function getDockerClient() {
  if (docker) {
    return docker;
  }

  docker = new Docker({
    socketPath: "/var/run/docker.sock",
  });

  return docker;
}