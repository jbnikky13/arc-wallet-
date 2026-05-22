"use client";
import { useState } from "react";
import axios from "axios";

const PAIRS = ["ARC/USDC", "BTC/USDC", "ETH/USDC", "SOL/USDC"];
const PRICES: Record<string, number> = { "ARC/USDC": 2.504, "BTC/USDC": 69441, "ETH/USDC": 3542, "SOL/USDC": 148 };

export default function PerpsPage() {
  const [pair, setPair] = useState("ARC/USDC");
  const [direction, setDirection] = useState<"LONG" | "SHORT">("LONG");
  const [size, setSize] = useState("100");
  const [leverage, setLeverage] = useState(5);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const price = PRICES[pair];
  const liqPrice = direction === "LONG" ? (price * (1 - 1 / leverage)).toFixed(4) : (price * (1 + 1 / leverage)).toFixed(4);

  const handleOpen = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/perps", { pair, direction, size, leverage });
      setResult(res.data);
    } catch (err: any) {
      alert(err.response?.data?.error ?? "Failed");
    } finally { setLoading(false); }
  };

  return (
    <main className="min-h-screen p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-black mb-1">⚡ Perpetuals</h1>
      <p className="text-[#5b7a99] text-xs font-mono mb-8">Fee: $0.10 USDC · x402 · Arc Testnet</p>
      <div className="bg-[#0c1020] border border-[#ffffff10] rounded-xl p-6 space-y-4">
        <div className="flex gap-3">
          {(["LONG", "SHORT"] as const).map((d) => (
            <button key={d} onClick={() => setDirection(d)}
              className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-colors ${direction === d ? (d === "LONG" ? "bg-[#00ffa3] text-[#060810]" : "bg-[#ff4d6d] text-white") : "bg-[#111827] border border-[#ffffff10] text-[#5b7a99]"}`}>
              {d}
            </button>
          ))}
        </div>
        <select value={pair} onChange={(e) => setPair(e.target.value)}
          className="w-full bg-[#111827] border border-[#ffffff10] rounded-xl px-4 py-3 outline-none text-white font-mono text-sm">
          {PAIRS.map((p) => <option key={p}>{p}</option>)}
        </select>
        <input type="number" placeholder="Size (USDC)" value={size} onChange={(e) => setSize(e.target.value)}
          className="w-full bg-[#111827] border border-[#ffffff10] rounded-xl px-4 py-3 outline-none text-white font-mono text-sm" />
        <div>
          <div className="flex justify-between text-xs font-mono text-[#5b7a99] mb-2">
            <span>Leverage</span><span className="text-[#f5c842] font-bold">{leverage}x</span>
          </div>
          <input type="range" min="1" max="20" value={leverage} onChange={(e) => setLeverage(parseInt(e.target.value))} className="w-full accent-[#f5c842]" />
        </div>
        <div className="bg-[#111827] rounded-xl p-4 space-y-2 text-xs font-mono text-[#5b7a99]">
          <div className="flex justify-between"><span>Entry Price</span><span className="text-white">${price.toLocaleString()}</span></div>
          <div className="flex justify-between"><span>Liquidation Price</span><span className="text-[#ff4d6d]">${liqPrice}</span></div>
          <div className="flex justify-between"><span>Fee</span><span className="text-[#63caff]">$0.10 via x402</span></div>
        </div>
        <button onClick={handleOpen} disabled={loading}
          className={`w-full font-bold py-3 rounded-xl text-sm transition-colors disabled:opacity-50 ${direction === "LONG" ? "bg-[#00ffa3] text-[#060810]" : "bg-[#ff4d6d] text-white"}`}>
          {loading ? "Opening..." : `Open ${leverage}x ${direction}`}
        </button>
        {result?.success && <p className="text-xs text-[#00ffa3] font-mono text-center">✓ Position #{result.positionId} opened</p>}
      </div>
    </main>
  );
}
