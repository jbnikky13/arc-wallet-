import { NextRequest, NextResponse } from "next/server";

// x402-style payment header check
// Real x402 SDK will replace this once package stabilises
const PROTECTED_ROUTES: Record<string, string> = {
  "/api/swap":    "$0.01",
  "/api/predict": "$0.05",
  "/api/perps":   "$0.10",
  "/api/nft":     "$0.02",
};

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const price = PROTECTED_ROUTES[path];

  if (!price) return NextResponse.next();

  // Check for x402 payment proof header
  const paymentHeader = request.headers.get("X-PAYMENT");

  if (!paymentHeader) {
    // Return 402 Payment Required — standard x402 response
    return NextResponse.json(
      {
        error: "Payment required",
        x402Version: 1,
        accepts: [
          {
            scheme: "exact",
            network: "eip155:5042002",
            maxAmountRequired: price,
            resource: request.url,
            description: `ARC Wallet — ${path} fee`,
            mimeType: "application/json",
            payTo: process.env.NEXT_PUBLIC_WALLET_ADDRESS,
            maxTimeoutSeconds: 60,
            asset: "USDC",
          },
        ],
      },
      {
        status: 402,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  // Payment header present — allow through
  return NextResponse.next();
}

export const config = {
  matcher: ["/api/swap", "/api/predict", "/api/perps", "/api/nft"],
};