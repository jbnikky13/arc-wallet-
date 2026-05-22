import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { context, marketData, walletBalance } = await req.json();

    const systemPrompt = `You are an autonomous DeFi trading agent on Arc Network.
Analyze markets and respond ONLY in this exact JSON format, no extra text:
{
  "action": "SWAP" or "PREDICT" or "HOLD" or "STAKE",
  "reasoning": "2-3 sentence analysis",
  "confidence": 0.0 to 1.0,
  "trade": {
    "type": "swap" or "predict" or "stake" or null,
    "fromToken": "ARC" or "USDC" or null,
    "toToken": "USDC" or "ARC" or null,
    "amount": number or null,
    "marketId": "string" or null,
    "position": "YES" or "NO" or null
  },
  "riskLevel": "LOW" or "MEDIUM" or "HIGH",
  "expectedReturn": number
}`;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": process.env.ANTHROPIC_API_KEY!,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-5",
        max_tokens: 1024,
        system: systemPrompt,
        messages: [{
          role: "user",
          content: `Market data: ${JSON.stringify(marketData)}\nWallet balance: ${walletBalance} USDC\nContext: ${context ?? "Agora Agents Hackathon demo"}`
        }],
      }),
    });

    if (!response.ok) throw new Error(`Anthropic API error: ${await response.text()}`);

    const data = await response.json();
    const rawText = data.content?.[0]?.text ?? "{}";

    let decision;
    try {
      decision = JSON.parse(rawText.replace(/```json|```/g, "").trim());
    } catch {
      decision = { action: "HOLD", reasoning: "Could not parse response", confidence: 0, trade: {}, riskLevel: "LOW", expectedReturn: 0 };
    }

    return NextResponse.json({ success: true, decision, timestamp: new Date().toISOString() });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
