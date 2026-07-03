import axios from "axios";

import type { DockerContainer } from "@/types/docker";

export async function getContainers(): Promise<DockerContainer[]> {
  const { data } = await axios.get("/api/docker/containers");

  return data;
}