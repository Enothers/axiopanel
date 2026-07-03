import { npmFetch } from "./client";

export async function getProxyHosts() {
  const res = await npmFetch("/api/nginx/proxy-hosts");

  return res.json();
}