export type ContainerState =
  | "created"
  | "running"
  | "paused"
  | "restarting"
  | "removing"
  | "exited"
  | "dead";

export interface DockerPort {
  ip?: string;
  privatePort: number;
  publicPort?: number;
  type: "tcp" | "udp";
}

export interface DockerMount {
  source: string;
  destination: string;
  mode: string;
  rw: boolean;
}


export interface DockerContainer {
  id: string;
  name: string;
  image: string;

  state: ContainerState;
  status: string;

  created: number;

  ports: DockerPort[];

  mounts: DockerMount[];

  labels: Record<string, string>;

  network: string[];
}

export interface DockerContainerStats {
  cpu: number;
  memory: number;
  memoryLimit: number;
}