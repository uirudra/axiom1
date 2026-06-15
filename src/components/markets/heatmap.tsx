"use client";

import { motion } from "framer-motion";
import { getHeatColor, getHeatBorder } from "@/lib/utils";

interface Sector {
  name: string;
  pct: number;
  stocks: string[];
}

const SECTORS: Sector[] = [
  { name: "Technology", pct: 3.41, stocks: ["NVDA", "MSFT", "AAPL"] },
  { name: "Financials", pct: -0.21, stocks: ["JPM", "V", "BRK.B"] },
  { name: "Healthcare", pct: 0.87, stocks: ["UNH", "JNJ", "LLY"] },
  { name: "Energy", pct: -1.84, stocks: ["XOM", "CVX", "COP"] },
  { name: "Consumer Disc.", pct: -1.22, stocks: ["AMZN", "TSLA", "HD"] },
  { name: "Industrials", pct: 0.31, stocks: ["BA", "CAT", "GE"] },
  { name: "Materials", pct: 0.55, stocks: ["LIN", "APD", "FCX"] },
  { name: "Utilities", pct: -0.44, stocks: ["NEE", "DUK", "SO"] },
  { name: "Real Estate", pct: -2.17, stocks: ["AMT", "PLD", "CCI"] },
];

export default function Heatmap() {
  return (
    <div className="grid grid-cols-3 gap-3">
      {SECTORS.map((sector, i) => (
        <motion.div
          key={sector.name}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.05, ease: "easeOut" }}
          whileHover={{ scale: 1.03 }}
          className="rounded-xl p-4 border cursor-default transition-all duration-300"
          style={{
            background: getHeatColor(sector.pct),
            borderColor: getHeatBorder(sector.pct),
          }}
        >
          <div className="flex items-start justify-between mb-3">
            <p className="text-xs font-mono text-fore/80 uppercase tracking-wide leading-tight">{sector.name}</p>
            <span
              className="text-sm font-display font-bold"
              style={{ color: sector.pct > 0 ? "#00d68f" : "#f72585" }}
            >
              {sector.pct > 0 ? "+" : ""}{sector.pct}%
            </span>
          </div>
          <div className="flex gap-1 flex-wrap">
            {sector.stocks.map((s) => (
              <span key={s} className="text-[10px] font-mono text-dim/70 bg-void/40 px-1.5 py-0.5 rounded">
                {s}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
