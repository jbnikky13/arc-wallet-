# ARC Wallet — Open Source Primitives for Arc Network

A composable Web3 wallet built on Circle's Arc Network, exposing reusable primitives for the Arc ecosystem.

## Primitives included

| Primitive | Location | What it does |
|-----------|----------|-------------|
| Circle Wallet factory | `src/app/api/wallet/create/` | Create SCA wallets on Arc Testnet |
| x402 payment middleware | `src/middleware.ts` | Micropayment gate for any API route |
| AI Agent loop | `src/app/api/agent/` | Autonomous analyze → execute cycle |
| Arc Testnet wagmi config | `src/lib/wagmi.ts` | Chain config for Arc (ID: 5042002) |
| Swap route | `src/app/api/swap/` | Token swap pattern on Arc |
| Prediction market | `src/app/api/predict/` | On-chain prediction placement |
| Staking | `src/app/api/stake/` | Pool staking pattern |
| NFT marketplace | `src/app/api/nft/` | NFT listing pattern |

## Stack
- Next.js 15 · TypeScript · Tailwind CSS
- Circle Developer Controlled Wallets SDK
- x402 micropayment protocol
- Claude AI (Anthropic) autonomous agent
- Arc Testnet (Chain ID: 5042002)

## Quick start

```bash
git clone https://github.com/jbnikky13/arc-wallet
cd arc-wallet
npm install --legacy-peer-deps
cp .env.example .env.local
npm run dev
```

## Environment variables
CIRCLE_API_KEY=TEST_API_KEY:key_id:key_secret
CIRCLE_ENTITY_SECRET=your_64_char_hex
ANTHROPIC_API_KEY=sk-ant-your-key-here
NEXT_PUBLIC_WALLET_ADDRESS=0xYourWalletAddress
NEXT_PUBLIC_ARC_RPC=https://rpc.testnet.arc.network
NEXT_PUBLIC_ARC_CHAIN_ID=5042002
NEXT_PUBLIC_ARC_EXPLORER=https://testnet.arcscan.app
NEXT_PUBLIC_APP_URL=http://localhost:3000
## Arc Testnet
- RPC: https://rpc.testnet.arc.network
- Chain ID: 5042002
- Explorer: https://testnet.arcscan.app
- Faucet: https://faucet.circle.com

## Live demo
https://arc-wallet-dev.vercel.app

## License
MIT
