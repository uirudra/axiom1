"use client";

import { motion } from "framer-motion";
import { AnimatedAIChat } from "@/components/ui/animated-ai-chat";
import { BackgroundPaths } from "@/components/ui/background-paths";

export default function AgentPage() {
  return (
    <div className="page-enter h-screen flex flex-col pt-16 overflow-hidden">
      {/* Header */}
      <div className="relative border-b border-rim/30 bg-hull/30 backdrop-blur-sm flex-shrink-0">
        <BackgroundPaths />
        <div className="relative z-10 px-6 py-5">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-1">
              <span className="h-2 w-2 rounded-full bg-charge animate-pulse-dot" style={{ boxShadow: "0 0 6px #00d68f" }} />
              <span className="font-mono text-[10px] text-charge uppercase tracking-widest">AI Online</span>
            </div>
            <h1 className="font-display text-2xl md:text-3xl font-bold text-fore">
              AXIOM <span className="text-plasma">INTELLIGENCE</span>
            </h1>
            <p className="text-dim text-xs font-mono mt-0.5">
              Powered by Groq · gpt-oss-120B · Finance &amp; Data Science Expert
            </p>
          </motion.div>
        </div>
      </div>

      {/* Animated AI Chat */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex-1 min-h-0"
      >
        <AnimatedAIChat />
      </motion.div>
    </div>
  );
}
