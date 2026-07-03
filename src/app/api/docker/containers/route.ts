import { NextResponse } from "next/server";

import { dockerService } from "@/services/docker/service";

export async function GET() {
  try {
    const containers = await dockerService.getContainers();

    return NextResponse.json(containers);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Impossible de récupérer les conteneurs.",
      },
      {
        status: 500,
      }
    );
  }
}