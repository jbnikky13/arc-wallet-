// x402 config constants — used by API routes and frontend
export const X402_CONFIG = {
  facilitatorUrl: "https://x402.org/facilitator",
  network: "eip155:5042002",
  asset: "USDC",
  payTo: process.env.NEXT_PUBLIC_WALLET_ADDRESS as `0x${string}`,
} as const;

export const ROUTE_PRICES = {
  "/api/swap":    "$0.01",
  "/api/predict": "$0.05",
  "/api/perps":   "$0.10",
  "/api/nft":     "$0.02",
} as const;