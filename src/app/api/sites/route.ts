import { NextResponse } from "next/server";

import { getProxyHosts } from "@/services/npm/sites";

export async function GET() {
  const hosts = await getProxyHosts();

  return NextResponse.json(
    hosts.map((host: any) => ({
      id: host.id.toString(),

      name: host.domain_names[0],

      domain: host.domain_names.join(", "),

      status: "online",

      ssl: host.certificate_id !== 0,

      github: "",

      path: "",

      container: host.forward_host,

      database: "",

      redis: "",

      createdAt: "",
    }))
  );
}