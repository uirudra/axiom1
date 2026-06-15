"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Database, Cpu, Layers, Zap, Target } from "lucide-react";

const STEPS = [
  { id: "ingest", label: "Data Ingestion", desc: "Market feeds, news, alt-data", icon: Database, color: "#00f5d4" },
  { id: "process", label: "Processing", desc: "Cleaning, normalization, feature extraction", icon: Cpu, color: "#7209b7" },
  { id: "feature", label: "Feature Eng.", desc: "Alpha factor construction", icon: Layers, color: "#f72585" },
  { id: "train", label: "Model Training", desc: "Distributed ML training on GPUs", icon: Zap, color: "#ffd60a" },
  { id: "predict", label: "Predictions", desc: "Real-time signal generation", icon: Target, color: "#00d68f" },
];

const MODELS = [
  { name: "Momentum Alpha v3", accuracy: 73.2, data: "18.4M records", color: "#00f5d4" },
  { name: "Volatility Regime", accuracy: 81.7, data: "9.2M records", color: "#f72585" },
  { name: "Sentiment Flow", accuracy: 66.9, data: "42.1M records", color: "#ffd60a" },
];

const PYTHON_CODE = `<span style="color:#8888aa"># AXIOM Feature Pipeline</span>
<span style="color:#f72585">import</span> <span style="color:#00f5d4">numpy</span> as np
<span style="color:#f72585">import</span> <span style="color:#00f5d4">pandas</span> as pd
<span style="color:#f72585">from</span> <span style="color:#00f5d4">sklearn.preprocessing</span> <span style="color:#f72585">import</span> RobustScaler

<span style="color:#8888aa"># Compute rolling momentum features</span>
<span style="color:#ffd60a">def</span> <span style="color:#00d68f">compute_alpha_factors</span>(df: pd.DataFrame) -> pd.DataFrame:
    lookbacks = [<span style="color:#00f5d4">5</span>, <span style="color:#00f5d4">10</span>, <span style="color:#00f5d4">21</span>, <span style="color:#00f5d4">63</span>]

    <span style="color:#f72585">for</span> lb <span style="color:#f72585">in</span> lookbacks:
        df[<span style="color:#ffd60a">f"mom_{lb}"</span>] = df[<span style="color:#ffd60a">"close"</span>].pct_change(lb)
        df[<span style="color:#ffd60a">f"vol_{lb}"</span>] = df[<span style="color:#ffd60a">"returns"</span>].rolling(lb).std() * np.sqrt(<span style="color:#00f5d4">252</span>)

    <span style="color:#8888aa"># Cross-sectional rank normalization</span>
    scaler = RobustScaler()
    features = [c <span style="color:#f72585">for</span> c <span style="color:#f72585">in</span> df.columns <span style="color:#f72585">if</span> c.startswith(<span style="color:#ffd60a">"mom_"</span>)]
    df[features] = scaler.fit_transform(df[features])

    <span style="color:#f72585">return</span> df.dropna()

alpha_df = compute_alpha_factors(prices_df)
<span style="color:#8888aa"># Sharpe: 2.41 | Max DD: -4.7% | Win Rate: 68.3%</span>`;

function ProgressBar({ value, color }: { value: number; color: string }) {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setWidth(value), 200);
          obs.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="h-1 rounded-full bg-rim/40 overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-1500 ease-out"
        style={{ width: `${width}%`, background: color, boxShadow: `0 0 6px ${color}60` }}
      />
    </div>
  );
}

export default function PipelineFlow() {
  return (
    <div className="space-y-20">
      {/* Pipeline diagram */}
      <div>
        <div className="flex items-center gap-4 mb-8">
          <p className="text-dim font-mono text-xs uppercase tracking-widest">Pipeline Flow</p>
          <div className="flex-1 h-px bg-gradient-to-r from-rim/60 to-transparent" />
        </div>
        <div className="flex flex-col md:flex-row items-stretch gap-0">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            const isLast = i === STEPS.length - 1;
            return (
              <div key={step.id} className="flex md:flex-col items-center flex-1">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.12 }}
                  className="flex flex-col items-center gap-3 p-4 rounded-2xl border border-rim/40 bg-hull/60 w-full mx-1 hover:border-opacity-80 transition-all duration-300 group"
                  style={{ borderColor: step.color + "30" }}
                  whileHover={{ y: -3 }}
                >
                  <div className="p-2.5 rounded-xl" style={{ background: step.color + "20", color: step.color }}>
                    <Icon size={18} />
                  </div>
                  <div className="text-center">
                    <p className="font-mono text-xs font-semibold text-fore">{step.label}</p>
                    <p className="text-[10px] text-dim mt-0.5 leading-tight">{step.desc}</p>
                  </div>
                  <span className="font-mono text-[10px] text-dim/50">Step {i + 1}</span>
                </motion.div>

                {!isLast && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12 + 0.3 }}
                    className="hidden md:flex items-center px-1"
                  >
                    <svg width="24" height="12" viewBox="0 0 24 12" fill="none">
                      <motion.path
                        d="M0,6 L20,6 M14,1 L20,6 L14,11"
                        stroke="#1a1a2e"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.12 + 0.4, duration: 0.5 }}
                      />
                    </svg>
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Models */}
      <div>
        <div className="flex items-center gap-4 mb-6">
          <p className="text-dim font-mono text-xs uppercase tracking-widest">Active Models</p>
          <div className="flex-1 h-px bg-gradient-to-r from-rim/60 to-transparent" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {MODELS.map((model, i) => (
            <motion.div
              key={model.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-xl border border-rim/50 bg-hull/50 p-5"
            >
              <p className="font-mono text-sm font-semibold text-fore mb-1">{model.name}</p>
              <p className="text-[10px] text-dim font-mono mb-4">{model.data}</p>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-dim uppercase">Accuracy</span>
                <span className="font-display font-bold" style={{ color: model.color }}>{model.accuracy}%</span>
              </div>
              <ProgressBar value={model.accuracy} color={model.color} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Code notebook */}
      <div>
        <div className="flex items-center gap-4 mb-6">
          <p className="text-dim font-mono text-xs uppercase tracking-widest">Notebook Viewer</p>
          <div className="flex-1 h-px bg-gradient-to-r from-rim/60 to-transparent" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-rim/60 bg-hull/80 overflow-hidden"
        >
          <div className="flex items-center gap-2 px-4 py-3 border-b border-rim/40 bg-void/60">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-pulse/60" />
              <div className="w-3 h-3 rounded-full bg-heat/60" />
              <div className="w-3 h-3 rounded-full bg-charge/60" />
            </div>
            <span className="text-dim text-xs font-mono ml-2">axiom_alpha_factors.py</span>
          </div>
          <pre
            className="p-6 text-sm font-mono leading-relaxed overflow-x-auto text-fore/90"
            dangerouslySetInnerHTML={{ __html: PYTHON_CODE }}
          />
        </motion.div>
      </div>
    </div>
  );
}
