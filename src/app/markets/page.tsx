"use client";

import { motion } from "framer-motion";
import StockTable from "@/components/markets/stock-table";
import Heatmap from "@/components/markets/heatmap";
import MacroIndicators from "@/components/markets/macro-indicators";

export default function MarketsPage() {
  return (
    <div className="page-enter pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto space-y-16">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4"
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span
                className="h-2.5 w-2.5 rounded-full bg-charge animate-pulse-dot"
                style={{ boxShadow: "0 0 8px #00d68f" }}
              />
              <span className="font-mono text-xs text-charge uppercase tracking-widest">Live Feed</span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-fore">
              LIVE MARKETS
            </h1>
          </div>
        </motion.div>

        {/* Macro row */}
        <section>
          <SectionLabel>Macro Indicators</SectionLabel>
          <MacroIndicators />
        </section>

        {/* Stock table */}
        <section>
          <SectionLabel>Equities Terminal</SectionLabel>
          <StockTable />
        </section>

        {/* Sector heatmap */}
        <section>
          <SectionLabel>Sector Heatmap</SectionLabel>
          <Heatmap />
        </section>

        {/* Disclaimer */}
        <p className="text-dim/40 text-xs font-mono text-center border-t border-rim/20 pt-6">
          Data is simulated for demonstration purposes. Not financial advice.
          All prices reflect delayed mock data as of market close.
        </p>
      </div>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <p className="text-dim font-mono text-xs uppercase tracking-widest">{children}</p>
      <div className="flex-1 h-px bg-gradient-to-r from-rim/60 to-transparent" />
    </div>
  );
}
