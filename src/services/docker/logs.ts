import axios from "axios";

export async function getContainerLogs(id: string) {
  const { data } = await axios.get(
    `/api/docker/containers/${id}/logs`
  );

  return data.logs as string;
}