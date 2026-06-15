"use client";

import { motion } from "framer-motion";
import { SparklesCore } from "@/components/ui/sparkles-core";
import ToolsMatrix from "@/components/data-lab/tools-matrix";
import PipelineFlow from "@/components/data-lab/pipeline-flow";

export default function DataLabPage() {
  return (
    <div className="page-enter pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto space-y-20">

        {/* Header with particle field */}
        <section className="relative rounded-3xl overflow-hidden border border-rim/40 bg-hull/30 py-20 px-10 min-h-60 flex flex-col justify-center">
          <SparklesCore
            background="transparent"
            particleColor="#00f5d4"
            particleDensity={40}
            minSize={0.3}
            maxSize={1}
            speed={0.4}
          />
          <div className="relative z-10">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-plasma font-mono text-xs uppercase tracking-widest mb-3"
            >
              Research & Development
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="font-display text-5xl md:text-7xl font-bold text-fore"
            >
              DATA<br />
              <span className="text-pulse">LABORATORY</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-dim text-base mt-4 max-w-lg"
            >
              Statistical engines, ML forecasting pipelines, and real-time
              sentiment analysis — powering quantitative alpha generation.
            </motion.p>
          </div>
        </section>

        {/* Tools matrix */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <p className="text-dim font-mono text-xs uppercase tracking-widest">Tools Matrix</p>
            <div className="flex-1 h-px bg-gradient-to-r from-rim/60 to-transparent" />
          </div>
          <ToolsMatrix />
        </section>

        {/* Pipeline + models + notebook */}
        <PipelineFlow />

      </div>
    </div>
  );
}
