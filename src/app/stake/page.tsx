"use client";
import { useState } from "react";

const POOLS = [
  { name: "ARC Validator",  apy: 24.1, tvl: "$4.2M",  lock: "30 days",  icon: "◈", color: "#63caff" },
  { name: "ARC-USDC LP",    apy: 18.6, tvl: "$8.7M",  lock: "7 days",   icon: "◎", color: "#00ffa3" },
  { name: "Circle Stable",  apy: 9.8,  tvl: "$14.1M", lock: "Flexible", icon: "🌀", color: "#a78bfa" },
];

export default function StakePage() {
  const [selected, setSelected] = useState(0);
  const [amount, setAmount] = useState("");
  const pool = POOLS[selected];
  const yearlyReward = amount ? ((parseFloat(amount) * pool.apy) / 100).toFixed(2) : null;

  return (
    <main className="min-h-screen p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-black mb-1">◉ Staking</h1>
      <p className="text-[#5b7a99] text-xs font-mono mb-8">Earn yield on Arc · No x402 fee · USDC rewards</p>
      <div className="space-y-3 mb-8">
        {POOLS.map((p, i) => (
          <div key={p.name} onClick={() => setSelected(i)}
            className={`border rounded-xl p-5 flex items-center gap-4 cursor-pointer transition-all ${selected === i ? "border-[#63caff] bg-[#0d1f35]" : "border-[#ffffff10] bg-[#0c1020] hover:border-[#ffffff20]"}`}>
            <span className="text-2xl w-10 text-center">{p.icon}</span>
            <div className="flex-1">
              <p className="font-bold text-sm">{p.name}</p>
              <p className="text-[#5b7a99] text-xs font-mono">TVL: {p.tvl} · Lock: {p.lock}</p>
            </div>
            <div className="text-right">
              <p className="font-black text-xl" style={{ color: p.color }}>{p.apy}%</p>
              <p className="text-[#5b7a99] text-xs">APY</p>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-[#0c1020] border border-[#ffffff10] rounded-xl p-6">
        <p className="font-bold mb-4">Stake in {pool.name}</p>
        <input type="number" placeholder="Amount (USDC)" value={amount} onChange={(e) => setAmount(e.target.value)}
          className="w-full bg-[#111827] border border-[#ffffff10] rounded-xl px-4 py-3 outline-none text-white font-mono mb-3 focus:border-[#63caff] text-sm" />
        {yearlyReward && (
          <p className="text-[#5b7a99] text-sm font-mono mb-4">
            Estimated yearly: <span className="text-[#00ffa3] font-bold">{yearlyReward} USDC</span>
          </p>
        )}
        <button className="w-full bg-[#63caff] text-[#060810] font-bold py-3 rounded-xl hover:bg-[#00e5ff] transition-colors text-sm">
          Stake {amount ? `${amount} USDC` : "Now"}
        </button>
      </div>
    </main>
  );
}
