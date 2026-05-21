import { NextResponse } from "next/server";
import { circleClient } from "@/lib/circle";

export async function POST() {
  try {
    // Step 1: Create a wallet set
    const walletSetRes = await circleClient.createWalletSet({
      name: "ARC Wallet Set",
    });
    const walletSetId = walletSetRes.data?.walletSet?.id;

    if (!walletSetId) {
      return NextResponse.json({ error: "Wallet set creation failed" }, { status: 500 });
    }

    // Step 2: Create a wallet on Arc Testnet
    const walletRes = await circleClient.createWallets({
      walletSetId,
      blockchains: ["ARC-TESTNET"],
      count: 1,
      accountType: "SCA", // Smart Contract Account for gas sponsorship
    });

    const wallet = walletRes.data?.wallets?.[0];

    return NextResponse.json({
      success: true,
      walletId: wallet?.id,
      address: wallet?.address,
      blockchain: wallet?.blockchain,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}