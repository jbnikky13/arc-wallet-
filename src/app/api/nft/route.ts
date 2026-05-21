// x402 protected — $0.02 USDC per listing

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { tokenId, contractAddress, price, currency } = body;

  // TODO: Interact with NFT marketplace contract on Arc
  // circleClient.createContractExecutionTransaction(...)

  return NextResponse.json({
    success: true,
    listingId: "list_" + Date.now(),
    tokenId,
    contractAddress,
    price,
    currency: currency ?? "ARC",
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  });
}