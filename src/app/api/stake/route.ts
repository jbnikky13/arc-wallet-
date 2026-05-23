import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { poolName, amount } = await req.json();
    await new Promise((r) => setTimeout(r, 800));
    return NextResponse.json({
      success: true,
      poolName,
      amount,
      stakedAt: new Date().toISOString(),
      txHash: "0xstake_" + Date.now(),
      explorer: `https://testnet.arcscan.app`,
      apy: poolName === "ARC Validator" ? "24.1%" : poolName === "ARC-USDC LP" ? "18.6%" : "9.8%",
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
