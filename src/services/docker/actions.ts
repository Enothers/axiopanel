import axios from "axios";

export async function startContainer(id: string) {
  await axios.post(`/api/docker/containers/${id}/start`);
}

export async function stopContainer(id: string) {
  await axios.post(`/api/docker/containers/${id}/stop`);
}

export async function restartContainer(id: string) {
  await axios.post(`/api/docker/containers/${id}/restart`);
}