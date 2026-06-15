"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ParallaxText() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["15%", "-15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={ref}
      className="relative py-32 overflow-hidden border-y border-rim/30"
    >
      {/* Accent blobs */}
      <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-96 h-40 bg-plasma/5 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-96 h-40 bg-pulse/5 blur-3xl rounded-full pointer-events-none" />

      <motion.div style={{ y, opacity }} className="relative z-10 text-center px-6">
        <p className="text-dim font-mono text-xs uppercase tracking-widest mb-6">core philosophy</p>
        <h2
          className="font-display font-bold leading-[0.9] uppercase"
          style={{ fontSize: "clamp(2.5rem, 8vw, 7rem)" }}
        >
          <span className="block text-fore/10 text-[0.7em] mb-2">We believe</span>
          <span
            className="block"
            style={{
              background: "linear-gradient(90deg, #f0f0ff 0%, #00f5d4 40%, #f72585 70%, #f0f0ff 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Intelligence
          </span>
          <span className="block text-fore/80">Over Intuition</span>
        </h2>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm font-mono text-dim">
          {["Quantitative Edge", "Data-Driven Alpha", "Model Precision"].map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              {i > 0 && <div className="hidden sm:block w-px h-4 bg-rim" />}
              <span className="hover:text-plasma transition-colors cursor-default">{item}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
