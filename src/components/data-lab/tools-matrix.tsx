"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart2, Brain, MessageSquare, Shield } from "lucide-react";

interface Tool {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  tags: string[];
  metrics: { label: string; value: string }[];
  color: string;
}

const TOOLS: Tool[] = [
  {
    id: "stats",
    name: "Statistical Analysis",
    description: "Hypothesis testing, regression analysis, and distribution fitting across financial time series with Bayesian inference support.",
    icon: <BarChart2 size={22} />,
    tags: ["OLS", "GARCH", "Cointegration"],
    metrics: [
      { label: "Models Available", value: "47" },
      { label: "Processing Speed", value: "12ms" },
    ],
    color: "#00f5d4",
  },
  {
    id: "ml",
    name: "ML Forecasting",
    description: "Gradient boosting, LSTM networks, and transformer architectures trained on financial time series for price and volatility prediction.",
    icon: <Brain size={22} />,
    tags: ["XGBoost", "LSTM", "Transformer"],
    metrics: [
      { label: "Active Models", value: "12" },
      { label: "Avg Accuracy", value: "73.2%" },
    ],
    color: "#f72585",
  },
  {
    id: "sentiment",
    name: "Sentiment Engine",
    description: "Real-time NLP processing of news, earnings calls, and social signals. Sentiment-alpha correlation tracked live across asset classes.",
    icon: <MessageSquare size={22} />,
    tags: ["FinBERT", "NER", "Signal"],
    metrics: [
      { label: "Sources Monitored", value: "2,400" },
      { label: "Latency", value: "840ms" },
    ],
    color: "#ffd60a",
  },
  {
    id: "risk",
    name: "Risk Calculator",
    description: "VaR, CVaR, Monte Carlo simulation, and stress testing. Portfolio risk decomposition with factor attribution.",
    icon: <Shield size={22} />,
    tags: ["VaR", "CVaR", "Monte Carlo"],
    metrics: [
      { label: "Scenarios/Run", value: "100K" },
      { label: "Confidence", value: "99.5%" },
    ],
    color: "#7209b7",
  },
];

export default function ToolsMatrix() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {TOOLS.map((tool) => {
        const isExpanded = expanded === tool.id;

        return (
          <motion.div
            key={tool.id}
            onClick={() => setExpanded(isExpanded ? null : tool.id)}
            animate={{
              borderColor: isExpanded ? tool.color + "50" : "rgba(26,26,46,0.6)",
              boxShadow: isExpanded ? `0 0 40px ${tool.color}12` : "none",
            }}
            transition={{ duration: 0.25 }}
            className="rounded-2xl border border-rim/60 bg-hull/50 p-6 cursor-pointer transition-colors duration-300"
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex items-start gap-4">
              <div
                className="p-2.5 rounded-xl flex-shrink-0"
                style={{ color: tool.color, background: tool.color + "15" }}
              >
                {tool.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-display text-lg font-semibold text-fore">{tool.name}</h3>
                <div className="flex gap-1.5 mt-2 flex-wrap">
                  {tool.tags.map((tag) => (
                    <span key={tag} className="text-[10px] font-mono text-dim bg-rim/40 px-2 py-0.5 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <motion.span
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-dim text-xs font-mono flex-shrink-0 mt-1"
              >
                ↓
              </motion.span>
            </div>

            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 mt-4 border-t border-rim/30">
                    <p className="text-dim text-sm leading-relaxed mb-4">{tool.description}</p>
                    <div className="grid grid-cols-2 gap-3">
                      {tool.metrics.map((m) => (
                        <div key={m.label} className="bg-void/60 rounded-lg p-3">
                          <p className="text-dim text-[10px] font-mono uppercase tracking-wide mb-1">{m.label}</p>
                          <p className="font-display text-xl font-bold" style={{ color: tool.color }}>{m.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
