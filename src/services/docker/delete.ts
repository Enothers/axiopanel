import axios from "axios";

export async function deleteContainer(id: string) {
  await axios.delete(
    `/api/docker/containers/${id}/delete`
  );
}