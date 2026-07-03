import axios from "axios";

export async function getContainerStats(id: string) {
  const { data } = await axios.get(
    `/api/docker/containers/${id}/stats`
  );

  return data;
}