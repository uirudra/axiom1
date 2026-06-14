"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardData {
  title: string;
  description: string;
  tag: string;
  date: string;
  accentColor: string;
  className?: string;
}

function DisplayCard({ title, description, tag, date, accentColor, className }: CardData) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "relative flex h-40 w-80 -skew-y-[6deg] select-none flex-col justify-between",
        "rounded-2xl border bg-hull/80 backdrop-blur-sm px-5 py-4",
        "transition-all duration-500 cursor-default",
        className
      )}
      style={{ borderColor: accentColor + "30" }}
    >
      <div className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-500"
           style={{ background: `linear-gradient(135deg, ${accentColor}08, transparent)` }} />

      <div className="flex items-center gap-2">
        <span
          className="h-1.5 w-1.5 rounded-full animate-pulse-dot"
          style={{ background: accentColor, boxShadow: `0 0 6px ${accentColor}` }}
        />
        <span className="text-xs font-mono text-dim uppercase tracking-widest">{tag}</span>
      </div>

      <div>
        <p className="text-base font-display font-semibold text-fore leading-tight">{title}</p>
        <p className="text-sm text-dim mt-1 leading-relaxed">{description}</p>
      </div>

      <p className="text-xs font-mono text-dim/60">{date}</p>

      <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-void/80 to-transparent rounded-r-2xl" />
    </motion.div>
  );
}

const DEFAULT_CARDS: CardData[] = [
  {
    title: "SPY breaks 200-day MA",
    description: "S&P 500 ETF reclaims key technical level on volume surge",
    tag: "Technical",
    date: "Just now",
    accentColor: "#00f5d4",
    className: "[grid-area:stack]",
  },
  {
    title: "Fed Signals Pause",
    description: "FOMC minutes reveal cautious stance on further hikes",
    tag: "Macro",
    date: "2h ago",
    accentColor: "#f72585",
    className: "[grid-area:stack] translate-x-10 translate-y-8",
  },
  {
    title: "NVDA ML Revenue +42%",
    description: "Datacenter AI workloads drive record quarterly earnings",
    tag: "Earnings",
    date: "Today",
    accentColor: "#7209b7",
    className: "[grid-area:stack] translate-x-20 translate-y-16",
  },
];

export default function DisplayCards({ cards = DEFAULT_CARDS }: { cards?: CardData[] }) {
  return (
    <div className="grid [grid-template-areas:'stack'] place-items-start">
      {cards.map((card, i) => (
        <DisplayCard key={i} {...card} />
      ))}
    </div>
  );
}
