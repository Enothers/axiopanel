import { NextResponse } from "next/server";

import { query } from "@/lib/db";
import { createSite } from "@/services/sites/site-service";

export async function GET() {
  try {
    const sites = await query(
      "SELECT * FROM sites ORDER BY id DESC"
    );

    return NextResponse.json(sites);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Impossible de récupérer les sites.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    await createSite(body);

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Impossible de créer le site.",
      },
      {
        status: 500,
      }
    );
  }
}