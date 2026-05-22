"use client";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

type AgentLog = {
  id: string;
  timestamp: string;
  decision: any;
  execution: any;
  marketData: any;
};

export default function AgentPage() {
  const [walletId, setWalletId] = useState("");
  const [walletBalance, setWalletBalance] = useState("100");
  const [running, setRunning] = useState(false);
  const [logs, setLogs] = useState<AgentLog[]>([]);
  const [creating, setCreating] = useState(false);
  const [agentAddress, setAgentAddress] = useState("");
  const [cycleCount, setCycleCount] = useState(0);
  const [error, setError] = useState("");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const logsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const createAgentWallet = async () => {
    setCreating(true);
    setError("");
    try {
      const res = await axios.post("/api/wallet/create");
      setWalletId(res.data.walletId);
      setAgentAddress(res.data.address);
    } catch (err: any) {
      setError("Wallet creation failed: " + (err.response?.data?.error ?? err.message));
    } finally {
      setCreating(false);
    }
  };

  const runCycle = async () => {
    try {
      const res = await axios.post("/api/agent/loop", {
        walletId: walletId || "demo-wallet-id",
        walletBalance: parseFloat(walletBalance),
      });
      const cycle = res.data.cycle;
      const log: AgentLog = {
        id: Date.now().toString(),
        timestamp: cycle.completedAt,
        decision: cycle.decision,
        execution: cycle.execution,
        marketData: cycle.marketData,
      };
      setLogs((prev) => [log, ...prev].slice(0, 20));
      setCycleCount((c) => c + 1);
    } catch (err: any) {
      setError("Cycle error: " + (err.response?.data?.error ?? err.message));
    }
  };

  const toggleAgent = () => {
    if (running) {
      clearInterval(intervalRef.current!);
      setRunning(false);
    } else {
      setRunning(true);
      setError("");
      runCycle();
      intervalRef.current = setInterval(runCycle, 15000);
    }
  };

  useEffect(() => {
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  const actionColor: Record<string, string> = {
    SWAP: "#63caff", PREDICT: "#00ffa3", STAKE: "#a78bfa", HOLD: "#5b7a99",
  };

  return (
    <main className="min-h-screen p-6 md:p-10 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-black tracking-tight mb-1">
          🤖 AI Agent <span className="text-[#a78bfa]">Dashboard</span>
        </h1>
        <p className="text-[#5b7a99] text-sm font-mono">
          Claude Sonnet · Autonomous DeFi trader · Arc Testnet · x402
        </p>
      </div>

      <div className="bg-[#0c1020] border border-[#ffffff10] rounded-xl p-6 mb-6">
        <h2 className="font-bold text-sm uppercase tracking-widest text-[#5b7a99] mb-4">Agent Setup</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-xs text-[#5b7a99] font-mono block mb-1">Agent Wallet ID</label>
            <input value={walletId} onChange={(e) => setWalletId(e.target.value)}
              placeholder="Auto-filled after creation"
              className="w-full bg-[#111827] border border-[#ffffff10] rounded-lg px-3 py-2 text-sm font-mono text-white outline-none focus:border-[#a78bfa]" />
          </div>
          <div>
            <label className="text-xs text-[#5b7a99] font-mono block mb-1">USDC Balance</label>
            <input type="number" value={walletBalance} onChange={(e) => setWalletBalance(e.target.value)}
              className="w-full bg-[#111827] border border-[#ffffff10] rounded-lg px-3 py-2 text-sm font-mono text-white outline-none focus:border-[#63caff]" />
          </div>
        </div>
        <div className="flex gap-3 flex-wrap">
          <button onClick={createAgentWallet} disabled={creating}
            className="bg-[#111827] border border-[#ffffff15] text-white font-bold px-5 py-2.5 rounded-xl text-sm hover:border-[#a78bfa] transition-colors disabled:opacity-50">
            {creating ? "Creating..." : "Create Circle Wallet"}
          </button>
          <button onClick={toggleAgent}
            className={`font-bold px-6 py-2.5 rounded-xl text-sm transition-colors ${running ? "bg-[#ff4d6d20] border border-[#ff4d6d44] text-[#ff4d6d]" : "bg-[#a78bfa] text-[#060810]"}`}>
            {running ? "⏹ Stop Agent" : "▶ Start Agent"}
          </button>
          <button onClick={runCycle}
            className="bg-[#111827] border border-[#ffffff15] text-white font-bold px-5 py-2.5 rounded-xl text-sm hover:border-[#63caff] transition-colors">
            ↺ Run Once
          </button>
        </div>
        {agentAddress && (
          <p className="mt-3 text-xs font-mono text-[#a78bfa]">
            Agent: {agentAddress} ·{" "}
            <a href={`https://testnet.arcscan.app/address/${agentAddress}`} target="_blank" rel="noopener" className="underline">
              ArcScan
            </a>
          </p>
        )}
        {error && <p className="mt-3 text-xs text-[#ff4d6d] font-mono">{error}</p>}
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-[#0c1020] border border-[#ffffff10] rounded-xl p-4 text-center">
          <p className="text-2xl font-black text-[#63caff]">{cycleCount}</p>
          <p className="text-xs text-[#5b7a99] font-mono mt-1">Cycles Run</p>
        </div>
        <div className="bg-[#0c1020] border border-[#ffffff10] rounded-xl p-4 text-center">
          <p className="text-2xl font-black text-[#00ffa3]">
            {logs.filter((l) => l.execution?.executed).length}
          </p>
          <p className="text-xs text-[#5b7a99] font-mono mt-1">Trades Executed</p>
        </div>
        <div className="bg-[#0c1020] border border-[#ffffff10] rounded-xl p-4 text-center">
          <div className="flex items-center justify-center gap-1.5">
            <div className={`w-2 h-2 rounded-full ${running ? "bg-[#00ffa3] animate-pulse" : "bg-[#5b7a99]"}`} />
            <p className="text-sm font-bold">{running ? "Running" : "Stopped"}</p>
          </div>
          <p className="text-xs text-[#5b7a99] font-mono mt-1">Agent Status</p>
        </div>
      </div>

      <div className="bg-[#0c1020] border border-[#ffffff10] rounded-xl p-6">
        <h2 className="font-bold text-sm uppercase tracking-widest text-[#5b7a99] mb-4">Agent Reasoning Log</h2>
        {logs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-3xl mb-3">🤖</p>
            <p className="text-[#5b7a99] text-sm font-mono">Press Start Agent or Run Once to begin.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {logs.map((log) => (
              <div key={log.id} className="border border-[#ffffff08] rounded-xl p-4 bg-[#060810]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold px-2 py-0.5 rounded font-mono"
                    style={{ background: `${actionColor[log.decision?.action] ?? "#5b7a99"}18`, color: actionColor[log.decision?.action] ?? "#5b7a99" }}>
                    {log.decision?.action ?? "UNKNOWN"}
                  </span>
                  <span className="text-xs text-[#5b7a99] font-mono">
                    {new Date(log.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-sm text-white mb-2 leading-relaxed">{log.decision?.reasoning}</p>
                <div className="flex gap-4 text-xs font-mono text-[#5b7a99]">
                  <span>Confidence: <span className="text-white">{((log.decision?.confidence ?? 0) * 100).toFixed(0)}%</span></span>
                  <span>Risk: <span style={{ color: log.decision?.riskLevel === "HIGH" ? "#ff4d6d" : log.decision?.riskLevel === "MEDIUM" ? "#f5c842" : "#00ffa3" }}>{log.decision?.riskLevel}</span></span>
                  <span>ARC: <span className="text-white">${log.marketData?.arcPrice?.toFixed(3)}</span></span>
                </div>
                {log.execution?.executed && (
                  <div className="mt-2 pt-2 border-t border-[#ffffff08]">
                    <p className="text-xs text-[#00ffa3] font-mono">✓ Executed on Arc</p>
                  </div>
                )}
              </div>
            ))}
            <div ref={logsEndRef} />
          </div>
        )}
      </div>
    </main>
  );
}
