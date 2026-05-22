import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { decision, walletId } = await req.json();

    if (!decision || !walletId) {
      return NextResponse.json({ error: "decision and walletId required" }, { status: 400 });
    }

    if (decision.riskLevel === "HIGH" || decision.confidence < 0.65) {
      return NextResponse.json({ executed: false, reason: `Skipped — risk: ${decision.riskLevel}, confidence: ${decision.confidence}` });
    }

    if (decision.action === "HOLD") {
      return NextResponse.json({ executed: false, reason: "Agent decided to HOLD" });
    }

    return NextResponse.json({
      executed: true,
      action: decision.action,
      txId: "tx_" + Date.now(),
      txHash: "0xarc" + Date.now(),
      explorer: `https://testnet.arcscan.app`,
      decision,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
