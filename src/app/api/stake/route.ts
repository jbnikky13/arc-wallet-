import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { poolName, amount, walletId } = await req.json();
    return NextResponse.json({
      success: true,
      poolName,
      amount,
      walletId,
      stakedAt: new Date().toISOString(),
      txHash: "0xstake_" + Date.now(),
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
