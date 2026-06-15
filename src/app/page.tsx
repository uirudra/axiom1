"use client";

import Hero from "@/components/home/hero";
import StatCounters from "@/components/home/stat-counters";
import Marquee from "@/components/home/marquee";
import ParallaxText from "@/components/home/parallax-text";
import Link from "next/link";
import { ArrowRight, TrendingUp, BarChart2, Brain, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="page-enter">
      <Hero />
      <Marquee />
      <StatCounters />
      <ParallaxText />
      <FeaturedAnalysis />
      <FeatureGrid />
      <FooterCTA />
    </div>
  );
}

const ANALYSIS_ITEMS = [
  {
    tag: "Technical",
    title: "SPY breaks 200-day MA",
    excerpt: "S&P 500 ETF reclaims key technical level on volume surge of 52M shares — bulls retake structural support.",
    date: "Just now",
    color: "#00f5d4",
    metric: "+0.42%",
  },
  {
    tag: "Macro",
    title: "Fed Signals Pause",
    excerpt: "FOMC minutes reveal cautious stance on further hikes. Rates held at 5.25-5.50% with data-dependent forward guidance.",
    date: "2h ago",
    color: "#f72585",
    metric: "5.25%",
  },
  {
    tag: "Earnings",
    title: "NVDA Revenue +42% YoY",
    excerpt: "Datacenter AI workloads drive record quarterly earnings. Data center revenue reaches $18.4B, beating consensus by $2.1B.",
    date: "Today",
    color: "#7209b7",
    metric: "+3.41%",
  },
];

function FeaturedAnalysis() {
  return (
    <section className="py-24 px-6 relative">
      {/* Subtle top border */}
      <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-rim to-transparent" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-14">
          <div>
            <p className="text-dim font-mono text-xs uppercase tracking-widest mb-3">Latest Analysis</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-fore leading-none">
              Featured
            </h2>
          </div>
          <Link
            href="/insights"
            className="group flex items-center gap-2 text-dim hover:text-plasma text-sm font-mono transition-colors"
          >
            All Insights
            <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Cards — horizontal row, no stacking */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {ANALYSIS_ITEMS.map((item, i) => (
            <motion.div
              key={item.tag}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="group relative rounded-2xl border border-rim/50 bg-hull/50 p-6 overflow-hidden cursor-default hover:border-opacity-100 transition-all duration-300"
              style={{ "--accent": item.color } as React.CSSProperties}
            >
              {/* Glow blob on hover */}
              <div
                className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: item.color + "20" }}
              />

              {/* Tag + metric row */}
              <div className="flex items-center justify-between mb-5">
                <span
                  className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full border"
                  style={{ color: item.color, borderColor: item.color + "40", background: item.color + "10" }}
                >
                  {item.tag}
                </span>
                <span className="font-mono text-sm font-bold" style={{ color: item.color }}>
                  {item.metric}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-display text-xl font-bold text-fore leading-snug mb-3 group-hover:text-white transition-colors">
                {item.title}
              </h3>

              {/* Excerpt */}
              <p className="text-dim text-sm leading-relaxed mb-5">{item.excerpt}</p>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-dim/50">{item.date}</span>
                <span className="text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: item.color }}>
                  Read →
                </span>
              </div>

              {/* Bottom accent line */}
              <div
                className="absolute bottom-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: item.color }}
              />
            </motion.div>
          ))}
        </div>

        {/* Pull quote — full width, breathing room */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl border border-rim/30 bg-gradient-to-br from-hull/60 via-hull/20 to-transparent p-10 md:p-14 overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-64 h-64 bg-plasma/5 blur-3xl rounded-full" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-pulse/5 blur-3xl rounded-full" />

          <div className="relative max-w-2xl">
            <span className="font-display text-7xl text-plasma/20 leading-none select-none">&ldquo;</span>
            <p className="font-display text-2xl md:text-3xl font-bold text-fore leading-snug -mt-4 mb-6">
              The signal is not in the noise — it&rsquo;s in the{" "}
              <span style={{
                background: "linear-gradient(90deg,#00f5d4,#f72585)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                pattern of the noise
              </span>{" "}
              itself.
            </p>
            <footer className="text-dim font-mono text-xs tracking-widest">— AXIOM Research Team, 2025</footer>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const FEATURES = [
  {
    icon: TrendingUp,
    title: "Real-Time Markets",
    desc: "Terminal-grade data for equities, crypto, and macro indicators.",
    href: "/markets",
    color: "#00f5d4",
  },
  {
    icon: Brain,
    title: "ML Forecasting",
    desc: "Transformer models and LSTM networks trained on financial time series.",
    href: "/data-lab",
    color: "#f72585",
  },
  {
    icon: Zap,
    title: "AI Intelligence",
    desc: "Expert-level Q&A on finance, risk models, and quantitative methods.",
    href: "/agent",
    color: "#ffd60a",
  },
  {
    icon: BarChart2,
    title: "Research Insights",
    desc: "Quantitative research papers and macro analysis from AXIOM's team.",
    href: "/insights",
    color: "#7209b7",
  },
];

function FeatureGrid() {
  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        {FEATURES.map((f, i) => {
          const Icon = f.icon;
          return (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <Link
                href={f.href}
                className="group flex flex-col gap-4 p-5 rounded-2xl border border-rim/40 bg-hull/30 hover:bg-hull/60 hover:border-rim transition-all duration-300"
              >
                <div className="p-2 rounded-xl w-fit" style={{ background: f.color + "15", color: f.color }}>
                  <Icon size={18} />
                </div>
                <div>
                  <p className="font-display font-semibold text-fore text-sm mb-1">{f.title}</p>
                  <p className="text-dim text-xs leading-relaxed">{f.desc}</p>
                </div>
                <span className="text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: f.color }}>
                  Explore →
                </span>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

function FooterCTA() {
  return (
    <section className="py-28 px-6 border-t border-rim/20">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-dim font-mono text-xs uppercase tracking-widest mb-5">Ready to begin?</p>
          <h2 className="font-display text-5xl md:text-7xl font-bold text-fore mb-6 leading-none">
            Ask the{" "}
            <span className="text-pulse">AI</span>
          </h2>
          <p className="text-dim text-base mb-12 leading-relaxed max-w-md mx-auto">
            AXIOM Intelligence understands quantitative finance, risk models, portfolio theory, and data science.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/agent"
              className="group relative inline-flex items-center justify-center gap-2.5 px-9 py-4 rounded-full font-semibold text-sm text-void overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
              style={{
                background: "linear-gradient(135deg, #f72585, #7209b7)",
                boxShadow: "0 4px 32px rgba(247,37,133,0.35), 0 1px 0 rgba(255,255,255,0.15) inset",
              }}
            >
              <span className="relative z-10">Launch AI Agent</span>
              <ArrowRight size={15} className="relative z-10 group-hover:translate-x-0.5 transition-transform" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                   style={{ background: "linear-gradient(135deg, #ff3d9a, #9b2eda)" }} />
            </Link>
            <Link
              href="/markets"
              className="inline-flex items-center justify-center gap-2.5 px-9 py-4 rounded-full border border-rim/70 text-dim font-semibold text-sm hover:border-plasma/50 hover:text-plasma hover:scale-105 active:scale-95 transition-all duration-300"
              style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.3), 0 1px 0 rgba(255,255,255,0.05) inset" }}
            >
              View Markets
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
