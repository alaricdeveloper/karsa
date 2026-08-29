import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  return NextResponse.json(
    { error: "Seed demo dinonaktifkan — Karsa menggunakan data real saja." },
    { status: 410 }
  );
}
