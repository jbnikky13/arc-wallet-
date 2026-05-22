"use client";
import { useState } from "react";

const NFTS = [
  { id: 1, name: "ARC Genesis #042", price: "4.2",  icon: "🌐", bg: "from-[#0d1f35] to-[#1a2a4a]" },
  { id: 2, name: "Circle Pass #118", price: "2.8",  icon: "⚡", bg: "from-[#1a0d35] to-[#2a1a4a]" },
  { id: 3, name: "Validator Key #7", price: "11.0", icon: "🔮", bg: "from-[#0d2a1a] to-[#1a3a2a]" },
  { id: 4, name: "ARC Epoch #999",   price: "6.4",  icon: "◈", bg: "from-[#2a1a0d] to-[#3a2a1a]" },
];

export default function NFTPage() {
  const [selected, setSelected] = useState<number | null>(null);
  return (
    <main className="min-h-screen p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-black mb-1">◆ NFT Marketplace</h1>
      <p className="text-[#5b7a99] text-xs font-mono mb-8">Listing fee: $0.02 USDC · x402 · Arc Testnet</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {NFTS.map((nft) => (
          <div key={nft.id} onClick={() => setSelected(selected === nft.id ? null : nft.id)}
            className={`border rounded-xl overflow-hidden cursor-pointer transition-all hover:-translate-y-1 ${selected === nft.id ? "border-[#63caff]" : "border-[#ffffff10]"}`}>
            <div className={`h-28 bg-gradient-to-br ${nft.bg} flex items-center justify-center text-4xl`}>{nft.icon}</div>
            <div className="p-3 bg-[#0c1020]">
              <p className="font-bold text-xs mb-1">{nft.name}</p>
              <p className="text-[#63caff] text-xs font-mono font-bold">{nft.price} USDC</p>
            </div>
          </div>
        ))}
      </div>
      {selected && (() => {
        const nft = NFTS.find((n) => n.id === selected)!;
        return (
          <div className="mt-6 bg-[#0c1020] border border-[#63caff33] rounded-xl p-6">
            <p className="font-bold mb-4">{nft.name}</p>
            <div className="flex gap-3">
              <button className="flex-1 bg-[#63caff] text-[#060810] font-bold py-2.5 rounded-xl text-sm">Buy · {nft.price} USDC</button>
              <button className="flex-1 border border-[#63caff33] text-[#63caff] font-bold py-2.5 rounded-xl text-sm">Make Offer</button>
            </div>
          </div>
        );
      })()}
    </main>
  );
}
