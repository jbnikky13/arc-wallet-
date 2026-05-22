"use client";
import { useState } from "react";
import axios from "axios";

const MARKETS = [
  { id: "arc-3-50-june", question: "Will ARC Token hit $3.50 before June 30?", yes: 68, vol: "$48.2K" },
  { id: "eth-4k-may",    question: "ETH above $4,000 by end of May?",           yes: 43, vol: "$124K"  },
  { id: "usdc-peg",      question: "Circle USDC holds $1.00 peg through June?", yes: 88, vol: "$11.6K" },
];

export default function PredictPage() {
  const [selected, setSelected] = useState(0);
  const [position, setPosition] = useState<"YES" | "NO">("YES");
  const [amount, setAmount] = useState("10");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/predict", { marketId: MARKETS[selected].id, position, amount, walletId: "demo-wallet" });
      setResult(res.data);
    } catch (err: any) {
      alert(err.response?.data?.error ?? "Failed");
    } finally { setLoading(false); }
  };

  return (
    <main className="min-h-screen p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-black mb-1">🎯 Prediction Markets</h1>
      <p className="text-[#5b7a99] text-xs font-mono mb-8">Fee: $0.05 USDC · x402 · Arc Testnet</p>
      <div className="space-y-3 mb-6">
        {MARKETS.map((m, i) => (
          <div key={m.id} onClick={() => setSelected(i)}
            className={`border rounded-xl p-4 cursor-pointer transition-all ${selected === i ? "border-[#00ffa3] bg-[#0d1f35]" : "border-[#ffffff10] bg-[#0c1020]"}`}>
            <p className="font-semibold text-sm mb-3">{m.question}</p>
            <div className="h-2 bg-[#ff4d6d30] rounded-full overflow-hidden mb-2">
              <div className="h-full rounded-full bg-gradient-to-r from-[#00ffa3] to-[#63caff]" style={{ width: `${m.yes}%` }} />
            </div>
            <div className="flex justify-between text-xs font-mono">
              <span className="text-[#00ffa3] font-bold">YES {m.yes}¢</span>
              <span className="text-[#5b7a99]">Vol: {m.vol}</span>
              <span className="text-[#ff4d6d] font-bold">NO {100 - m.yes}¢</span>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-[#0c1020] border border-[#ffffff10] rounded-xl p-6">
        <div className="flex gap-3 mb-4">
          {(["YES", "NO"] as const).map((p) => (
            <button key={p} onClick={() => setPosition(p)}
              className={`flex-1 py-2.5 rounded-xl font-bold text-sm ${position === p ? (p === "YES" ? "bg-[#00ffa3] text-[#060810]" : "bg-[#ff4d6d] text-white") : "bg-[#111827] text-[#5b7a99] border border-[#ffffff10]"}`}>
              {p}
            </button>
          ))}
        </div>
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)}
          className="w-full bg-[#111827] border border-[#ffffff10] rounded-xl px-4 py-3 outline-none text-white font-mono mb-3 text-sm" placeholder="Amount in USDC" />
        <button onClick={handlePredict} disabled={loading}
          className="w-full bg-[#00ffa3] text-[#060810] font-bold py-3 rounded-xl text-sm disabled:opacity-50">
          {loading ? "Placing..." : `Bet ${amount} USDC on ${position}`}
        </button>
        {result?.success && <p className="mt-3 text-xs text-[#00ffa3] font-mono text-center">✓ Placed · {result.shares} shares</p>}
      </div>
    </main>
  );
}
