"use client";

import React, { useId, useCallback } from "react";
import { ParticlesProvider, Particles } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { cn } from "@/lib/utils";

interface SparklesProps {
  id?: string;
  className?: string;
  background?: string;
  particleColor?: string;
  particleDensity?: number;
  minSize?: number;
  maxSize?: number;
  speed?: number;
}

function SparklesInner({
  id,
  className,
  background = "transparent",
  particleColor = "#00f5d4",
  particleDensity = 60,
  minSize = 0.4,
  maxSize = 1.2,
  speed = 0.6,
}: SparklesProps) {
  const generatedId = useId();

  return (
    <Particles
      id={id ?? generatedId}
      className={cn("absolute inset-0 w-full h-full", className)}
      options={{
        background: { color: { value: background } },
        fullScreen: { enable: false },
        fpsLimit: 60,
        particles: {
          color: { value: particleColor },
          move: {
            enable: true,
            direction: "none",
            outModes: { default: "bounce" },
            random: true,
            speed,
            straight: false,
          },
          number: {
            density: { enable: true },
            value: particleDensity,
          },
          opacity: {
            value: { min: 0.1, max: 0.6 },
            animation: { enable: true, speed: 1, sync: false },
          },
          shape: { type: "circle" },
          size: {
            value: { min: minSize, max: maxSize },
          },
        },
        detectRetina: true,
      }}
    />
  );
}

export function SparklesCore(props: SparklesProps) {
  const init = useCallback(loadSlim, []);

  return (
    <ParticlesProvider init={init}>
      <SparklesInner {...props} />
    </ParticlesProvider>
  );
}
