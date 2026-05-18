import { x402ResourceServer, HTTPFacilitatorClient } from "@x402/next";
import { registerExactEvmScheme } from "@x402/evm/exact/server";

const facilitatorClient = new HTTPFacilitatorClient({
  url: "https://x402.org/facilitator",
});

export const x402Server = new x402ResourceServer(facilitatorClient);
registerExactEvmScheme(x402Server);

// Reusable route configs for each feature
export const PAYMENT_ROUTES = {
  swap: {
    accepts: {
      scheme: "exact" as const,
      price: "$0.01",
      network: "eip155:480", // Arc Testnet chain ID
      payTo: process.env.NEXT_PUBLIC_WALLET_ADDRESS as `0x${string}`,
      maxTimeoutSeconds: 60,
    },
    description: "ARC Wallet — Swap fee",
  },
  predict: {
    accepts: {
      scheme: "exact" as const,
      price: "$0.05",
      network: "eip155:480",
      payTo: process.env.NEXT_PUBLIC_WALLET_ADDRESS as `0x${string}`,
      maxTimeoutSeconds: 60,
    },
    description: "ARC Wallet — Place prediction",
  },
  perps: {
    accepts: {
      scheme: "exact" as const,
      price: "$0.10",
      network: "eip155:480",
      payTo: process.env.NEXT_PUBLIC_WALLET_ADDRESS as `0x${string}`,
      maxTimeoutSeconds: 60,
    },
    description: "ARC Wallet — Open perpetual position",
  },
  nft: {
    accepts: {
      scheme: "exact" as const,
      price: "$0.02",
      network: "eip155:480",
      payTo: process.env.NEXT_PUBLIC_WALLET_ADDRESS as `0x${string}`,
      maxTimeoutSeconds: 60,
    },
    description: "ARC Wallet — NFT marketplace access",
  },
};