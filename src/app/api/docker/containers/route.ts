import { NextResponse } from "next/server";

import { dockerService } from "@/services/docker/service";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const container =
      await dockerService.getContainer(id);

    return NextResponse.json(container);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Container introuvable.",
      },
      {
        status: 404,
      }
    );
  }
}