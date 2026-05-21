"use client";
import { useState } from "react";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import axios from "axios";

const TOKENS = ["ARC", "USDC", "WBTC", "ETH"];

export default function SwapPage() {
  const { isConnected } = useAccount();
  const [fromToken, setFromToken] = useState("ARC");
  const [toToken, setToToken] = useState("USDC");
  const [amount, setAmount] = useState("100");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const outputEstimate = (parseFloat(amount || "0") * 0.9987).toFixed(4);

  const handleSwap = async () => {
    if (!isConnected) return;
    setLoading(true); setError("");
    try {
      const res = await axios.post("/api/swap", { fromToken, toToken, amount, walletId: "demo-wallet" });
      setResult(res.data);
    } catch (err: any) {
      setError(err.response?.data?.error ?? "Swap failed.");
    } finally { setLoading(false); }
  };

  return (
    <main className="min-h-screen p-6 max-w-lg mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-black">⇅ Swap</h1>
        <ConnectButton />
      </div>
      <p className="text-[#5b7a99] text-xs font-mono mb-6">Fee: $0.01 USDC · x402 · settled on Arc</p>
      <div className="bg-[#0c1020] border border-[#ffffff10] rounded-xl p-6 space-y-3">
        <div className="bg-[#111827] rounded-xl p-4">
          <label className="text-xs text-[#5b7a99] font-mono uppercase mb-2 block">You Pay</label>
          <div className="flex gap-3 items-center">
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)}
              className="bg-transparent text-3xl font-black w-full outline-none text-white" />
            <select value={fromToken} onChange={(e) => setFromToken(e.target.value)}
              className="bg-[#1a2a40] border border-[#63caff33] rounded-full px-4 py-1.5 text-sm font-semibold text-[#63caff] outline-none">
              {TOKENS.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
        </div>
        <div className="text-center text-[#63caff] text-xl cursor-pointer"
          onClick={() => { setFromToken(toToken); setToToken(fromToken); }}>⇅</div>
        <div className="bg-[#111827] rounded-xl p-4">
          <label className="text-xs text-[#5b7a99] font-mono uppercase mb-2 block">You Receive (est.)</label>
          <div className="flex gap-3 items-center">
            <span className="text-3xl font-black text-[#63caff]">{outputEstimate}</span>
            <select value={toToken} onChange={(e) => setToToken(e.target.value)}
              className="bg-[#1a2a40] border border-[#63caff33] rounded-full px-4 py-1.5 text-sm font-semibold text-[#63caff] outline-none">
              {TOKENS.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
        </div>
        <button onClick={handleSwap} disabled={loading || !isConnected}
          className="w-full bg-[#63caff] text-[#060810] font-bold py-3 rounded-xl hover:bg-[#00e5ff] transition-colors disabled:opacity-50 text-sm">
          {!isConnected ? "Connect Wallet" : loading ? "Processing..." : "Swap Tokens"}
        </button>
        {error && <p className="text-[#ff4d6d] text-xs font-mono text-center">{error}</p>}
        {result?.success && (
          <div className="bg-[#00ffa310] border border-[#00ffa330] rounded-xl p-4">
            <p className="text-[#00ffa3] font-bold text-sm">✓ Swap confirmed on Arc</p>
            <p className="text-[#5b7a99] font-mono text-xs mt-1">{result.inputAmount} {result.fromToken} → {result.outputAmount} {result.toToken}</p>
          </div>
        )}
      </div>
    </main>
  );
}
