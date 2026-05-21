import { NextResponse } from "next/server";

// Placeholder for x402 session token endpoint
export async function POST() {
  return NextResponse.json({ token: "x402-session-" + Date.now() });
}
