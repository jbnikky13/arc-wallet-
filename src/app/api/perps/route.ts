// x402 protected — $0.10 USDC per position open

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { pair, direction, size, leverage } = body;
  // direction: "LONG" | "SHORT"

  // TODO: Integrate with a perp protocol deployed on Arc
  // e.g., a Synthetix Perps fork or custom contract

  const entryPrice = direction === "LONG" ? 2.504 : 2.498; // mock

  return NextResponse.json({
    success: true,
    positionId: "pos_" + Date.now(),
    pair,
    direction,
    size,
    leverage,
    entryPrice,
    liquidationPrice:
      direction === "LONG"
        ? entryPrice * (1 - 1 / leverage)
        : entryPrice * (1 + 1 / leverage),
  });
}