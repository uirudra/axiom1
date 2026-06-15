"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

function FloatingPaths({ position }: { position: number }) {
  const paths = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        d: `M-${380 - i * 10 * position} -${189 + i * 12}C-${380 - i * 10 * position} -${189 + i * 12} -${312 - i * 10 * position} ${216 - i * 12} ${152 - i * 10 * position} ${343 - i * 12}C${616 - i * 10 * position} ${470 - i * 12} ${684 - i * 10 * position} ${875 - i * 12} ${684 - i * 10 * position} ${875 - i * 12}`,
        width: 0.4 + i * 0.05,
        opacity: 0.03 + i * 0.018,
        duration: 18 + i * 1.2,
        delay: i * 0.3,
      })),
    [position]
  );

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg
        className="w-full h-full"
        viewBox="0 0 696 316"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id={`pathGrad-${position}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00f5d4" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#7209b7" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#f72585" stopOpacity="0.6" />
          </linearGradient>
        </defs>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke={`url(#pathGrad-${position})`}
            strokeWidth={path.width}
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: [0, 1, 0],
              opacity: [0, path.opacity, 0],
            }}
            transition={{
              duration: path.duration,
              delay: path.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>
    </div>
  );
}

export function BackgroundPaths() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <FloatingPaths position={1} />
      <FloatingPaths position={-1} />
    </div>
  );
}
