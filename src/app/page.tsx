"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import Link from "next/link";

const features = [
  { name: "AI Agent",        path: "/agent",   icon: "🤖", desc: "Claude autonomous trader",      badge: "NEW · AI",      color: "#a78bfa" },
  { name: "Swap",            path: "/swap",    icon: "⇅",  desc: "Token swap on Arc",             badge: "$0.01 x402",    color: "#63caff" },
  { name: "Predict",         path: "/predict", icon: "🎯", desc: "Prediction markets",            badge: "$0.05 x402",    color: "#00ffa3" },
  { name: "Perpetuals",      path: "/perps",   icon: "⚡", desc: "Up to 20x leverage",            badge: "$0.10 x402",    color: "#f5c842" },
  { name: "Staking",         path: "/stake",   icon: "◉",  desc: "Earn yield on Arc",             badge: "Up to 24% APY", color: "#00ffa3" },
  { name: "NFT Marketplace", path: "/nft",     icon: "◆",  desc: "Buy, sell & list NFTs",         badge: "$0.02 x402",    color: "#a78bfa" },
];

export default function Dashboard() {
  const { address, isConnected } = useAccount();
  return (
    <main className="min-h-screen p-6 md:p-10 max-w-5xl mx-auto">
      <div className="flex justify-between items-start mb-10">
        <div>
          <h1 className="text-4xl font-black tracking-tight">
            ARC <span className="text-[#63caff]">Wallet</span>
          </h1>
          <p className="text-[#5b7a99] text-sm mt-1 font-mono">
            Circle Arc Network · x402 · Claude AI · Agora Agents 2026
          </p>
        </div>
        <ConnectButton />
      </div>

      <div className="bg-gradient-to-br from-[#0d1f35] to-[#0a1525] border border-[#63caff33] rounded-2xl p-8 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#63caff08] rounded-full -translate-y-16 translate-x-16" />
        <p className="text-[#5b7a99] text-xs font-mono uppercase tracking-widest mb-2">
          {isConnected ? `Connected · ${address?.slice(0,6)}...${address?.slice(-4)}` : "Connect wallet to start"}
        </p>
        <p className="text-5xl font-black tracking-tight bg-gradient-to-r from-white to-[#63caff] bg-clip-text text-transparent">
          $84,219.46
        </p>
        <p className="text-[#00ffa3] text-sm mt-2 font-mono">▲ +2.24% today · Arc Testnet</p>
        <div className="flex gap-3 mt-6">
          <button className="bg-[#63caff] text-[#060810] font-bold px-6 py-2.5 rounded-xl text-sm hover:bg-[#00e5ff] transition-colors">↑ Send</button>
          <button className="border border-[#63caff33] text-[#63caff] font-bold px-6 py-2.5 rounded-xl text-sm hover:border-[#63caff] transition-colors">↓ Receive</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((f) => (
          <Link href={f.path} key={f.name}>
            <div className="bg-[#0c1020] border border-[#ffffff10] hover:border-[#63caff44] rounded-xl p-5 cursor-pointer transition-all hover:bg-[#0d1f35] group h-full">
              <div className="flex justify-between items-start mb-3">
                <span className="text-2xl">{f.icon}</span>
                <span className="text-xs font-mono px-2 py-1 rounded-full" style={{ background: `${f.color}18`, color: f.color }}>
                  {f.badge}
                </span>
              </div>
              <h2 className="font-bold text-base group-hover:text-[#63caff] transition-colors mb-1">{f.name}</h2>
              <p className="text-[#5b7a99] text-sm">{f.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
