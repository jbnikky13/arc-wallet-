import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { tokenId, contractAddress, price, currency } = await req.json();
    await new Promise((r) => setTimeout(r, 800));
    return NextResponse.json({
      success: true,
      listingId: "list_" + Date.now(),
      tokenId,
      contractAddress,
      price,
      currency: currency ?? "USDC",
      expiresAt: new Date(Date.now() + 7 * 864e5).toISOString(),
      txHash: "0xnft_" + Date.now(),
      explorer: `https://testnet.arcscan.app`,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
