import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { walletId, walletBalance } = await req.json();
    const base = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

    const marketData = {
      arcPrice: 2.504 + (Math.random() - 0.5) * 0.1,
      arcChange24h: +(Math.random() * 6 - 3).toFixed(2),
      btcPrice: 69441 + (Math.random() - 0.5) * 1000,
      ethPrice: 3542 + (Math.random() - 0.5) * 100,
      predictionMarkets: [
        { id: "arc-3-50-june", question: "ARC hits $3.50 before June 30?", yesOdds: 0.68, volume: 48200 },
        { id: "eth-4k-may", question: "ETH above $4,000 by end of May?", yesOdds: 0.43, volume: 124000 },
      ],
      timestamp: new Date().toISOString(),
    };

    const analyzeRes = await fetch(`${base}/api/agent/analyze`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ marketData, walletBalance, context: "Agora Agents Hackathon" }),
    });

    if (!analyzeRes.ok) throw new Error("Analyze step failed");
    const { decision } = await analyzeRes.json();

    const executeRes = await fetch(`${base}/api/agent/execute`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ decision, walletId }),
    });

    if (!executeRes.ok) throw new Error("Execute step failed");
    const execution = await executeRes.json();

    return NextResponse.json({
      success: true,
      cycle: { marketData, decision, execution, completedAt: new Date().toISOString() },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
