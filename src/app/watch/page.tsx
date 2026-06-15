"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 240;
const FRAME_DIR = "/ezgif-6e21d08eb6d648c5-jpg";

function frameUrl(n: number) {
  return `${FRAME_DIR}/ezgif-frame-${String(n).padStart(3, "0")}.jpg`;
}

const CHAPTERS = [
  {
    number: "01",
    label: "About Us",
    heading: "Time,\nPerfected",
    body: "AXIOM was born from an obsession with precision. Every element of our craft is driven by a singular vision — to honour time with instruments worthy of it.",
  },
  {
    number: "02",
    label: "Manufacture",
    heading: "Engineered\nat the Limit",
    body: "Over 280 individual components machined to tolerances of 1/1000th of a millimetre. Raw alloy transformed through 47 stages of quality control.",
  },
  {
    number: "03",
    label: "Assembly",
    heading: "Built by\nHuman Hands",
    body: "Each movement assembled by master horologists over 60 hours. No automation replaces the care, intuition, and mastery of an AXIOM craftsman.",
  },
];

export default function WatchPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const chapterRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const [loadProgress, setLoadProgress] = useState(0);
  const [ready, setReady] = useState(false);

  // ── Canvas draw ──────────────────────────────────────────────────
  function drawFrame(index: number) {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];
    if (!canvas || !img?.complete) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // canvas.width/height are set to CSS pixel dimensions (no DPR multiplier)
    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;   // 1280
    const ih = img.naturalHeight;  // 720

    // Cover: scale to fill, center crop
    const scale = Math.max(cw / iw, ch / ih);
    const dx = (cw - iw * scale) / 2;
    const dy = (ch - ih * scale) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, dx, dy, iw * scale, ih * scale);
  }

  // ── Resize canvas ────────────────────────────────────────────────
  function resizeCanvas() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    // Use CSS pixel dimensions so drawFrame coords match directly
    canvas.width = canvas.offsetWidth || window.innerWidth;
    canvas.height = canvas.offsetHeight || window.innerHeight;
    drawFrame(currentFrameRef.current);
  }

  // ── Update chapter text via direct DOM ───────────────────────────
  function updateChapters(p: number) {
    chapterRefs.current.forEach((el, i) => {
      if (!el) return;
      const start = i / 3;
      const end = (i + 1) / 3;

      let opacity = 0;
      let ty = 32;

      if (p >= start && p <= end) {
        const local = (p - start) * 3;
        const fadeIn  = Math.min(local / 0.14, 1);
        const fadeOut = i < 2 ? Math.max(1 - (local - 0.86) / 0.14, 0) : 1;
        opacity = Math.min(fadeIn, fadeOut);
        ty = (1 - opacity) * (local < 0.14 ? 32 : -32);
      } else if (p > end) {
        ty = -32;
      }

      el.style.opacity = String(opacity);
      el.style.transform = `translateY(${ty}px)`;
    });

    const active = Math.min(Math.floor(p * 3), 2);
    dotRefs.current.forEach((dot, i) => {
      if (!dot) return;
      dot.style.backgroundColor = i === active ? "#00f5d4" : "rgba(255,255,255,0.15)";
      dot.style.transform = i === active ? "scale(1.5)" : "scale(1)";
    });
  }

  useEffect(() => {
    // ── 1. Preload all frames ────────────────────────────────────
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    let loaded = 0;

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.onload = () => {
        loaded++;
        setLoadProgress(Math.round((loaded / TOTAL_FRAMES) * 100));
        if (loaded === TOTAL_FRAMES) setReady(true);
      };
      img.src = frameUrl(i + 1);
      images[i] = img;
    }
    imagesRef.current = images;

    // ── 2. Resize handler ────────────────────────────────────────
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      triggerRef.current?.kill();
    };
  }, []);

  useEffect(() => {
    if (!ready) return;

    // Initial state
    resizeCanvas();
    drawFrame(0);
    chapterRefs.current.forEach((el, i) => {
      if (!el) return;
      el.style.opacity = i === 0 ? "1" : "0";
      el.style.transform = i === 0 ? "translateY(0px)" : "translateY(32px)";
    });

    const container = containerRef.current;
    if (!container) return;

    // ── 3. GSAP ScrollTrigger — scrub frames ────────────────────
    triggerRef.current = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.6,
      onUpdate: (self) => {
        const p = self.progress;

        // Frame index
        const idx = Math.min(Math.floor(p * TOTAL_FRAMES), TOTAL_FRAMES - 1);
        if (idx !== currentFrameRef.current) {
          currentFrameRef.current = idx;
          drawFrame(idx);
        }

        updateChapters(p);
      },
    });
  }, [ready]);

  return (
    <div>
      {/* ── Loading overlay ──────────────────────────────────── */}
      {!ready && (
        <div className="fixed inset-0 z-50 bg-[#030308] flex flex-col items-center justify-center gap-6">
          <p className="font-mono text-xs uppercase tracking-widest text-dim">Loading frames…</p>
          <div className="w-48 h-px bg-rim/30 relative overflow-hidden rounded-full">
            <div
              className="absolute top-0 left-0 h-full bg-plasma rounded-full transition-all duration-100"
              style={{ width: `${loadProgress}%` }}
            />
          </div>
          <p className="font-mono text-xs text-plasma">{loadProgress}%</p>
        </div>
      )}

      {/* ── Back link ────────────────────────────────────────── */}
      <Link
        href="/"
        className="fixed top-6 left-6 z-40 flex items-center gap-2 text-dim hover:text-fore font-mono text-xs uppercase tracking-widest transition-colors"
      >
        <ArrowLeft size={12} />
        Home
      </Link>

      {/* ── Scroll container — 300vh for 3 chapters ──────────── */}
      <div ref={containerRef} style={{ height: "300vh" }}>
        <div className="sticky top-0 h-screen overflow-hidden bg-[#030308]">

          {/* Canvas — frame animation, shifted left so watch sits right-of-centre */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0"
            style={{ width: "100%", height: "100%", objectPosition: "right center", transform: "translateX(-12%)" }}
          />

          {/* Gradient overlays — blend edges into page bg */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, #030308 0%, rgba(3,3,8,0.2) 12%, transparent 35%, transparent 65%, rgba(3,3,8,0.4) 88%, #030308 100%)",
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, rgba(3,3,8,0.85) 0%, rgba(3,3,8,0.3) 30%, transparent 55%)",
            }}
          />

          {/* Chapter text blocks */}
          {CHAPTERS.map((ch, i) => (
            <div
              key={i}
              ref={(el) => { chapterRefs.current[i] = el; }}
              className="absolute left-10 lg:left-20 bottom-24 max-w-md"
              style={{ willChange: "opacity, transform", transition: "opacity 0.04s linear, transform 0.04s linear" }}
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="font-mono text-[11px] tracking-widest" style={{ color: "#00f5d4" }}>
                  {ch.number}
                </span>
                <div className="h-px w-8" style={{ background: "rgba(0,245,212,0.4)" }} />
                <span className="font-mono text-[11px] uppercase tracking-widest" style={{ color: "#00f5d4" }}>
                  {ch.label}
                </span>
              </div>
              <h2
                className="font-display font-bold leading-[1.05] tracking-tight text-white mb-5 whitespace-pre-line"
                style={{ fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)" }}
              >
                {ch.heading}
              </h2>
              <p className="font-body leading-relaxed max-w-xs text-base" style={{ color: "rgba(170,170,195,0.75)" }}>
                {ch.body}
              </p>
            </div>
          ))}

          {/* Right-side chapter progress dots */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col items-end gap-5">
            {CHAPTERS.map((ch, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="hidden lg:block font-mono text-[10px] tracking-widest" style={{ color: "rgba(255,255,255,0.2)" }}>
                  {ch.label}
                </span>
                <div
                  ref={(el) => { dotRefs.current[i] = el; }}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    backgroundColor: i === 0 ? "#00f5d4" : "rgba(255,255,255,0.15)",
                    transition: "background-color 0.25s, transform 0.25s",
                    transform: i === 0 ? "scale(1.5)" : "scale(1)",
                  }}
                />
              </div>
            ))}
          </div>

          {/* Top label */}
          <div className="absolute top-8 right-10 lg:right-20">
            <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.18)" }}>
              AXIOM / Craft
            </span>
          </div>

          {/* Scroll hint */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ opacity: 0.45 }}>
            <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.5)" }}>
              scroll
            </span>
            <div className="w-px h-8" style={{ background: "linear-gradient(to bottom, rgba(0,245,212,0.6), transparent)" }} />
          </div>
        </div>
      </div>
    </div>
  );
}
