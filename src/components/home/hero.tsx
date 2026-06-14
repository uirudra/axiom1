"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { SplineScene } from "@/components/ui/splite";
import { InteractiveGlobe } from "@/components/ui/interactive-globe";
import Link from "next/link";
import { ArrowRight, TrendingUp } from "lucide-react";

const LETTERS = "AXIOM".split("");

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const validLetters = lettersRef.current.filter(Boolean) as HTMLSpanElement[];
    if (validLetters.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        validLetters,
        { opacity: 0, scale: 0.25, y: 60 },
        {
          opacity: 1, scale: 1, y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "back.out(1.6)",
          delay: 0.2,
        }
      );

      const sub = containerRef.current?.querySelector(".hero-sub");
      const cta = containerRef.current?.querySelector(".hero-cta");
      if (sub) gsap.fromTo(sub, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.9 });
      if (cta) gsap.fromTo(cta, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", delay: 1.2 });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Video background */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
        autoPlay
        muted
        loop
        playsInline
        src="/From Klickpin.com- Bold Dollar Tree DIY Ideas for Right Now-pin-id-20618110789758103.mp4"
      />
      {/* Dark veil over video for readability */}
      <div className="absolute inset-0 bg-void/75 pointer-events-none" style={{ zIndex: 1 }} />
      <BackgroundPaths />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,transparent_30%,#030308_90%)] pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-plasma/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-pulse/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full flex flex-col items-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-charge/30 bg-charge/5 text-charge text-xs font-mono uppercase tracking-widest"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-charge animate-pulse-dot" />
          Live Markets Active
          <TrendingUp size={11} />
        </motion.div>

        <h1
          className="font-display text-[clamp(5rem,18vw,14rem)] font-bold leading-none tracking-tight mb-6"
          aria-label="AXIOM"
        >
          {LETTERS.map((letter, i) => (
            <span
              key={i}
              ref={(el) => { lettersRef.current[i] = el; }}
              className="hero-letter inline-block"
              style={{
                color: "#00f5d4",
                textShadow: "0 0 40px rgba(0,245,212,0.55), 0 0 90px rgba(0,245,212,0.2), 0 2px 14px rgba(0,0,0,0.9)",
              }}
            >
              {letter}
            </span>
          ))}
        </h1>

        <p className="hero-sub opacity-0 font-body text-dim text-lg md:text-2xl font-light max-w-xl leading-relaxed mb-10">
          Where <span className="text-plasma font-medium">Finance</span> meets{" "}
          <span className="text-pulse font-medium">Data Intelligence</span>
        </p>

        <div className="hero-cta opacity-0 flex flex-col sm:flex-row gap-4 items-center mb-12">
          <Link
            href="/markets"
            className="group relative inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-body font-semibold text-sm text-void overflow-hidden hover:scale-105 active:scale-95 transition-all duration-200"
            style={{
              background: "linear-gradient(135deg, #00f5d4, #00c4a9)",
              boxShadow: "0 4px 28px rgba(0,245,212,0.35), 0 1px 0 rgba(255,255,255,0.2) inset",
            }}
          >
            View Markets
            <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link
            href="/agent"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full border border-rim/60 text-dim hover:text-fore hover:border-fore/20 hover:scale-105 active:scale-95 transition-all duration-200 text-sm font-body"
            style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.2), 0 1px 0 rgba(255,255,255,0.04) inset" }}
          >
            Ask AI Agent
          </Link>
        </div>

        {/* Spline 3D scene below content */}
        <div className="w-full max-w-5xl h-[500px] lg:h-[600px]">
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </div>

        {/* Global presence section */}
        <div className="w-full max-w-5xl mt-24 mb-16 rounded-2xl border border-rim/30 bg-hull/30 backdrop-blur-sm overflow-hidden">
          <div className="flex flex-col md:flex-row min-h-[460px]">
            {/* Left: copy */}
            <div className="flex-1 flex flex-col justify-center p-10 md:p-14 relative z-10">
              <div className="flex items-center gap-2 mb-6 w-fit px-3 py-1 rounded-full border border-charge/30 bg-charge/5 text-charge text-xs font-mono uppercase tracking-widest">
                <span className="h-1.5 w-1.5 rounded-full bg-charge animate-pulse-dot" />
                All systems operational
              </div>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-fore leading-tight mb-4">
                AXIOM is{" "}
                <span style={{
                  background: "linear-gradient(90deg, #00f5d4, #4cc9f0)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>
                  Global
                </span>
              </h2>
              <p className="font-body text-dim text-sm md:text-base leading-relaxed max-w-sm mb-10">
                Real-time financial intelligence streamed from markets across every major exchange on earth. Wherever capital moves, AXIOM sees it first.
              </p>
              <div className="flex items-center gap-6">
                <div>
                  <p className="font-display text-2xl font-bold text-fore">50+</p>
                  <p className="text-dim font-mono text-xs uppercase tracking-wider">Markets</p>
                </div>
                <div className="w-px h-8 bg-rim/50" />
                <div>
                  <p className="font-display text-2xl font-bold text-fore">&lt;50ms</p>
                  <p className="text-dim font-mono text-xs uppercase tracking-wider">Latency</p>
                </div>
                <div className="w-px h-8 bg-rim/50" />
                <div>
                  <p className="font-display text-2xl font-bold text-fore">24/7</p>
                  <p className="text-dim font-mono text-xs uppercase tracking-wider">Coverage</p>
                </div>
              </div>
            </div>

            {/* Right: interactive globe */}
            <div className="flex-1 flex items-center justify-center p-4 md:p-0 min-h-[360px]">
              <InteractiveGlobe size={440} />
            </div>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-dim text-[10px] font-mono uppercase tracking-widest">scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-plasma/50 to-transparent" />
      </motion.div>
    </section>
  );
}
