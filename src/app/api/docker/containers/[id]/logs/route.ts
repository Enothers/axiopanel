import { NextResponse } from "next/server";

import { dockerService } from "@/services/docker/service";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const logs = await dockerService.getContainerLogs(id);

    return NextResponse.json({
      logs,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Impossible de récupérer les logs.",
      },
      {
        status: 500,
      }
    );
  }
}