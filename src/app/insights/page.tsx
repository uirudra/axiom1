"use client";

import { motion } from "framer-motion";

const ARTICLES = [
  {
    title: "The Anatomy of a Market Microstructure Signal",
    excerpt: "How order flow imbalance at the millisecond level predicts short-term price direction with statistical significance well above random chance.",
    category: "Quantitative Research",
    readTime: "8 min read",
    date: "Jun 12, 2025",
    color: "#00f5d4",
    tag: "#QuantFinance",
  },
  {
    title: "Risk Parity in High-Volatility Regimes",
    excerpt: "Traditional risk parity assumptions break down when correlation structures shift. We explore regime-conditioned allocation strategies that adapt dynamically.",
    category: "Portfolio Theory",
    readTime: "11 min read",
    date: "Jun 9, 2025",
    color: "#f72585",
    tag: "#RiskParity",
  },
  {
    title: "Transformer Models for Cross-Asset Alpha",
    excerpt: "Applying attention mechanisms to discover non-linear dependencies between asset classes that linear models systematically miss.",
    category: "Machine Learning",
    readTime: "14 min read",
    date: "Jun 5, 2025",
    color: "#7209b7",
    tag: "#MLTrading",
  },
];

const TRENDING = [
  "#QuantFinance",
  "#MLTrading",
  "#RiskParity",
  "#AlphaGeneration",
  "#VolatilityMining",
  "#FactorInvesting",
  "#AltData",
  "#NLPFinance",
];

const TIMELINE = [
  { date: "Jun 12", event: "FOMC Decision — Rates Held at 5.25%", type: "macro", color: "#00f5d4" },
  { date: "Jun 10", event: "NVDA Earnings Beat +42% YoY Revenue", type: "earnings", color: "#00d68f" },
  { date: "Jun 8", event: "CPI Print: 3.1% vs 3.3% Expected", type: "data", color: "#ffd60a" },
  { date: "Jun 5", event: "NFP: +272K Jobs vs 185K Forecast", type: "data", color: "#ffd60a" },
  { date: "Jun 3", event: "SPY Breaks 200-Day Moving Average", type: "technical", color: "#f72585" },
];

function ArticleCard({ article, index }: { article: typeof ARTICLES[0]; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="group border-b border-rim/30 pb-10 last:border-0 cursor-default"
    >
      <div className="flex items-center gap-3 mb-4">
        <span
          className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full border"
          style={{ color: article.color, borderColor: article.color + "40", background: article.color + "10" }}
        >
          {article.category}
        </span>
        <span className="text-dim text-[10px] font-mono">{article.readTime}</span>
        <span className="text-dim/40 text-[10px] font-mono">{article.date}</span>
      </div>

      <h3 className="font-display text-2xl md:text-3xl font-bold text-fore leading-tight mb-3 group-hover:text-plasma transition-colors duration-300">
        {article.title}
      </h3>
      <p className="text-dim text-sm leading-relaxed max-w-2xl">{article.excerpt}</p>

      <div className="flex items-center gap-3 mt-4">
        <span className="text-xs font-mono" style={{ color: article.color }}>{article.tag}</span>
        <span className="h-px flex-1 max-w-16 bg-rim/40" />
        <motion.span
          className="text-xs font-mono text-dim group-hover:text-plasma transition-colors"
          whileHover={{ x: 4 }}
        >
          Read →
        </motion.span>
      </div>
    </motion.article>
  );
}

export default function InsightsPage() {
  return (
    <div className="page-enter pt-24 pb-20">
      {/* Mega header */}
      <div className="px-6 mb-16 overflow-hidden">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-bold leading-none uppercase text-fore/10"
          style={{ fontSize: "clamp(5rem, 20vw, 18rem)", letterSpacing: "-0.02em" }}
        >
          INSIGHTS
        </motion.h1>
      </div>

      {/* Pull quote */}
      <div className="relative px-6 py-16 mb-12 border-y border-rim/20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-plasma/3 via-transparent to-pulse/3 pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-display text-2xl md:text-4xl font-bold text-fore leading-tight"
          >
            &ldquo;The signal is not in the noise —<br />
            it&rsquo;s in the{" "}
            <span style={{
              background: "linear-gradient(90deg, #00f5d4, #f72585)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              pattern of the noise
            </span>{" "}
            itself.&rdquo;
          </motion.p>
          <p className="text-dim font-mono text-xs mt-4">— AXIOM Research Manifesto</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,280px] gap-16">

          {/* Articles */}
          <div className="space-y-10">
            <div className="flex items-center gap-4 mb-8">
              <p className="text-dim font-mono text-xs uppercase tracking-widest">Latest Research</p>
              <div className="flex-1 h-px bg-gradient-to-r from-rim/60 to-transparent" />
            </div>
            {ARTICLES.map((article, i) => (
              <ArticleCard key={i} article={article} index={i} />
            ))}
          </div>

          {/* Sidebar */}
          <aside className="space-y-10">

            {/* Trending topics */}
            <div>
              <p className="text-dim font-mono text-xs uppercase tracking-widest mb-5">Trending Topics</p>
              <div className="flex flex-wrap gap-2">
                {TRENDING.map((tag, i) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    className="text-xs font-mono text-dim border border-rim/50 px-3 py-1.5 rounded-full cursor-pointer hover:border-plasma/40 hover:text-plasma transition-all"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Event timeline */}
            <div>
              <p className="text-dim font-mono text-xs uppercase tracking-widest mb-5">Market Events</p>
              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-plasma/60 via-rim to-transparent" />
                <div className="space-y-5 pl-6">
                  {TIMELINE.map((event, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      className="relative"
                    >
                      <div
                        className="absolute -left-[1.5rem] top-1.5 w-2 h-2 rounded-full border-2 border-void"
                        style={{ background: event.color }}
                      />
                      <p className="text-[10px] font-mono text-dim/60 mb-0.5">{event.date}</p>
                      <p className="text-xs text-dim leading-relaxed">{event.event}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

          </aside>
        </div>
      </div>
    </div>
  );
}
