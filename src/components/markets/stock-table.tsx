"use client";

import { motion } from "framer-motion";

interface Stock {
  sym: string;
  name: string;
  price: string;
  change: string;
  changePct: string;
  volume: string;
  mktCap: string;
  sparkPath: string;
  positive: boolean;
}

const STOCKS: Stock[] = [
  { sym: "AAPL", name: "Apple Inc.", price: "189.84", change: "+0.64", changePct: "+0.34%", volume: "52.3M", mktCap: "2.93T", positive: true, sparkPath: "M0,20 L8,18 L16,22 L24,15 L32,17 L40,12 L48,14 L56,10 L64,13 L72,8" },
  { sym: "NVDA", name: "NVIDIA Corp.", price: "875.39", change: "+28.92", changePct: "+3.41%", volume: "44.1M", mktCap: "2.16T", positive: true, sparkPath: "M0,25 L8,22 L16,20 L24,18 L32,16 L40,14 L48,10 L56,8 L64,6 L72,4" },
  { sym: "MSFT", name: "Microsoft Corp.", price: "419.72", change: "+2.15", changePct: "+0.52%", volume: "21.7M", mktCap: "3.11T", positive: true, sparkPath: "M0,18 L8,20 L16,17 L24,19 L32,15 L40,16 L48,13 L56,15 L64,12 L72,11" },
  { sym: "AMZN", name: "Amazon.com Inc.", price: "186.77", change: "+1.72", changePct: "+0.93%", volume: "33.8M", mktCap: "1.96T", positive: true, sparkPath: "M0,22 L8,20 L16,24 L24,21 L32,19 L40,17 L48,20 L56,16 L64,14 L72,12" },
  { sym: "GOOGL", name: "Alphabet Inc.", price: "171.95", change: "+0.87", changePct: "+0.51%", volume: "18.2M", mktCap: "2.13T", positive: true, sparkPath: "M0,19 L8,21 L16,18 L24,22 L32,17 L40,19 L48,15 L56,17 L64,13 L72,14" },
  { sym: "TSLA", name: "Tesla Inc.", price: "248.23", change: "-3.07", changePct: "-1.22%", volume: "88.6M", mktCap: "793B", positive: false, sparkPath: "M0,8 L8,10 L16,9 L24,12 L32,14 L40,16 L48,13 L56,18 L64,20 L72,22" },
  { sym: "META", name: "Meta Platforms", price: "521.48", change: "+4.11", changePct: "+0.79%", volume: "14.3M", mktCap: "1.33T", positive: true, sparkPath: "M0,20 L8,17 L16,19 L24,15 L32,13 L40,11 L48,14 L56,10 L64,12 L72,9" },
  { sym: "BRK.B", name: "Berkshire Hathaway", price: "403.22", change: "+0.98", changePct: "+0.24%", volume: "2.8M", mktCap: "877B", positive: true, sparkPath: "M0,18 L8,19 L16,17 L24,18 L32,16 L40,17 L48,15 L56,16 L64,14 L72,13" },
  { sym: "JPM", name: "JPMorgan Chase", price: "208.67", change: "-0.44", changePct: "-0.21%", volume: "7.9M", mktCap: "601B", positive: false, sparkPath: "M0,12 L8,13 L16,12 L24,14 L32,15 L40,14 L48,16 L56,17 L64,16 L72,18" },
  { sym: "V", name: "Visa Inc.", price: "279.33", change: "+1.22", changePct: "+0.44%", volume: "5.7M", mktCap: "559B", positive: true, sparkPath: "M0,20 L8,18 L16,21 L24,17 L32,18 L40,15 L48,16 L56,13 L64,14 L72,11" },
];

function Sparkline({ path, positive }: { path: string; positive: boolean }) {
  return (
    <svg width="72" height="28" viewBox="0 0 72 28" fill="none" className="opacity-80">
      <path
        d={path}
        stroke={positive ? "#00d68f" : "#f72585"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export default function StockTable() {
  return (
    <div className="rounded-2xl border border-rim/60 overflow-hidden bg-hull/40 backdrop-blur-sm">
      {/* Table header */}
      <div className="grid grid-cols-[2fr,1fr,1fr,1fr,1fr,80px] gap-4 px-6 py-3 border-b border-rim/40 text-dim text-xs font-mono uppercase tracking-widest">
        <span>Asset</span>
        <span className="text-right">Price</span>
        <span className="text-right">Change</span>
        <span className="text-right hidden md:block">Volume</span>
        <span className="text-right hidden md:block">Mkt Cap</span>
        <span className="text-right">7D</span>
      </div>

      {STOCKS.map((stock, i) => (
        <motion.div
          key={stock.sym}
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ backgroundColor: "rgba(13,13,26,0.8)" }}
          className="grid grid-cols-[2fr,1fr,1fr,1fr,1fr,80px] gap-4 px-6 py-4 border-b border-rim/20 last:border-0 items-center cursor-default transition-colors"
        >
          <div className="flex flex-col gap-0.5">
            <span className="font-mono text-sm font-semibold text-fore">{stock.sym}</span>
            <span className="text-xs text-dim/70 truncate">{stock.name}</span>
          </div>
          <span className="font-mono text-sm text-right text-fore">${stock.price}</span>
          <div className="text-right">
            <span
              className="font-mono text-xs font-semibold"
              style={{ color: stock.positive ? "#00d68f" : "#f72585" }}
            >
              {stock.change}
            </span>
            <br />
            <span
              className="font-mono text-[10px]"
              style={{ color: stock.positive ? "#00d68f" : "#f72585" }}
            >
              {stock.changePct}
            </span>
          </div>
          <span className="font-mono text-xs text-right text-dim hidden md:block">{stock.volume}</span>
          <span className="font-mono text-xs text-right text-dim hidden md:block">{stock.mktCap}</span>
          <div className="flex justify-end">
            <Sparkline path={stock.sparkPath} positive={stock.positive} />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
