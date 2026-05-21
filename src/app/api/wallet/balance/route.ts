import { NextRequest, NextResponse } from "next/server";
import { circleClient } from "@/lib/circle";

export async function GET(req: NextRequest) {
  const walletId = req.nextUrl.searchParams.get("walletId");

  if (!walletId) {
    return NextResponse.json({ error: "walletId required" }, { status: 400 });
  }

  try {
    const balanceRes = await circleClient.getWalletTokenBalance({ id: walletId });

    return NextResponse.json({
      tokenBalances: balanceRes.data?.tokenBalances ?? [],
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}