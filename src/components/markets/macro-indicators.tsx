"use client";

import { motion } from "framer-motion";

const INDICATORS = [
  { label: "FED FUNDS RATE", value: "5.25%", delta: "steady", trend: "neutral", desc: "Target: 5.25-5.50%" },
  { label: "CPI YoY", value: "3.1%", delta: "▼ 0.2%", trend: "positive", desc: "Core PCE: 2.8%" },
  { label: "GDP GROWTH", value: "2.8%", delta: "▲ 0.3%", trend: "positive", desc: "Q4 2024 Annualized" },
  { label: "VIX INDEX", value: "18.4", delta: "▼ 1.2", trend: "positive", desc: "Fear/Greed: Neutral" },
];

const TREND_COLORS: Record<string, string> = {
  positive: "#00d68f",
  negative: "#f72585",
  neutral: "#8888aa",
};

export default function MacroIndicators() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {INDICATORS.map((ind, i) => (
        <motion.div
          key={ind.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="relative rounded-xl border border-rim/60 bg-hull/60 p-5 font-mono group hover:border-plasma/20 transition-colors overflow-hidden"
        >
          <p className="text-[10px] text-dim uppercase tracking-widest mb-3">{ind.label}</p>
          <p className="text-3xl font-display font-bold text-fore mb-1">{ind.value}</p>
          <p className="text-xs font-mono" style={{ color: TREND_COLORS[ind.trend] ?? "#8888aa" }}>
            {ind.delta}
          </p>
          <p className="text-[10px] text-dim/60 mt-2">{ind.desc}</p>

          {/* Scanline hover effect — parent now has relative + overflow-hidden */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300">
            <div
              className="absolute left-0 right-0 h-px bg-plasma/20"
              style={{ animation: "scanline 4s linear infinite" }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
