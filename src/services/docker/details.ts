import axios from "axios";

export async function getContainer(id: string) {
  const { data } = await axios.get(
    `/api/docker/containers/${id}`
  );

  return data;
}