"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

interface Stat {
  prefix?: string;
  value: number;
  suffix?: string;
  label: string;
  decimals?: number;
  color: string;
}

const STATS: Stat[] = [
  { prefix: "$", value: 2.4, suffix: "T", label: "Assets Tracked", decimals: 1, color: "#00f5d4" },
  { value: 147, suffix: "M", label: "Data Points Daily", decimals: 0, color: "#f72585" },
  { value: 99.97, suffix: "%", label: "System Uptime", decimals: 2, color: "#ffd60a" },
];

function StatItem({ stat, index }: { stat: Stat; index: number }) {
  const displayRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || animated) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true);
          const counter = { val: 0 };
          gsap.to(counter, {
            val: stat.value,
            duration: 2.2,
            ease: "power2.out",
            delay: index * 0.15,
            onUpdate() {
              if (displayRef.current) {
                displayRef.current.textContent = counter.val.toFixed(stat.decimals ?? 0);
              }
            },
          });
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [stat, index, animated]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center gap-2 group"
    >
      <div
        className="text-5xl md:text-7xl font-display font-bold tracking-tight leading-none"
        style={{ color: stat.color, filter: `drop-shadow(0 0 20px ${stat.color}40)` }}
      >
        <span className="text-fore/60 text-3xl md:text-5xl">{stat.prefix}</span>
        <span ref={displayRef}>0</span>
        <span>{stat.suffix}</span>
      </div>
      <p className="text-dim text-sm font-mono uppercase tracking-widest">{stat.label}</p>
      <div
        className="w-0 group-hover:w-full h-px transition-all duration-700"
        style={{ background: stat.color }}
      />
    </motion.div>
  );
}

export default function StatCounters() {
  return (
    <section className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-dim font-mono text-xs uppercase tracking-widest mb-16"
        >
          AXIOM by the numbers
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
          {STATS.map((stat, i) => (
            <StatItem key={i} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
