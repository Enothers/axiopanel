import { NextRequest, NextResponse } from "next/server";

import { deleteSite } from "@/services/sites/delete";

export async function DELETE(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  const { id } = await params;

  await deleteSite(
    Number(id)
  );

  return NextResponse.json({
    success: true,
  });
}