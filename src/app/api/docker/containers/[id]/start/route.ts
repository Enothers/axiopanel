import { NextResponse } from "next/server";

import { dockerService } from "@/services/docker/service";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await dockerService.startContainer(id);

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Impossible de démarrer le conteneur." },
      { status: 500 }
    );
  }
}