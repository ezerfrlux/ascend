"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface PixelEffectsProps {
  pixelCount?: number;
  seed?: number;
  gridSize?: number;
  pixelSize?: number;
  glowColor?: string;
  glowPosition?: { x: string; y: string };
  glowSize?: string;
  gridOpacity?: number;
  className?: string;
  "aria-label"?: string;
}

const PIXEL_PALETTE = [
  "#ffffff",
  "#e2e8f0",
  "#94a3b8",
  "#d8b4fe",
  "#c084fc",
  "#a855f7",
  "#7e22ce",
];

function seedRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return s / 2147483647;
  };
}

function generatePixels(
  width: number,
  height: number,
  seed: number,
  count: number,
  gridSize: number
) {
  const rand = seedRandom(seed);
  const cols = Math.ceil(width / gridSize);
  const rows = Math.ceil(height / gridSize);
  return Array.from({ length: count }, () => ({
    left: Math.floor(rand() * cols) * gridSize,
    top: Math.floor(rand() * rows) * gridSize,
    delay: rand() * 1.5,
    duration: 2 + rand() * 2.5,
    opacity: 0.25 + rand() * 0.75,
    color: PIXEL_PALETTE[Math.floor(rand() * PIXEL_PALETTE.length)],
  }));
}

export default function PixelEffects({
  pixelCount = 120,
  seed = 42,
  gridSize = 32,
  pixelSize = 4,
  glowColor = "rgba(168,85,247,0.12)",
  glowPosition = { x: "50%", y: "50%" },
  glowSize = "600px",
  gridOpacity = 0.025,
  className = "",
  "aria-label": ariaLabel = "Pixel effects background",
}: PixelEffectsProps) {
  const sectionRef = useRef<HTMLElement>(null);

  const [pixels, setPixels] = useState(() =>
    generatePixels(0, 0, seed, pixelCount, gridSize)
  );

  useEffect(() => {
    let rafId = 0;
    function generate() {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setPixels(generatePixels(window.innerWidth, window.innerHeight, Date.now(), pixelCount, gridSize));
      });
    }
    generate();
    let timeoutId: ReturnType<typeof setTimeout>;
    function onResize() {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(generate, 200);
    }
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timeoutId);
      window.removeEventListener("resize", onResize);
    };
  }, [pixelCount, gridSize]);

  const glowW = parseInt(glowSize) || 600;
  const glowH = parseInt(glowSize) || 600;

  return (
    <section
      ref={sectionRef}
      aria-label={ariaLabel}
      className={`relative isolate h-full w-full overflow-hidden select-none ${className}`}
    >
      {pixels.map((p, i) => (
        <motion.div
          key={`${p.left}-${p.top}-${i}`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, p.opacity, 0], scale: [0.2, 1, 0.2] }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            left: p.left,
            top: p.top,
            width: pixelSize,
            height: pixelSize,
            zIndex:2,
            background: p.color,
            boxShadow: p.color.includes("f")
              ? "0 0 6px rgba(168,85,247,0.4)"
              : "none",
          }}
        />
      ))}

      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        style={{
          zIndex:1,
          backgroundImage: `linear-gradient(rgba(255,255,255,${gridOpacity}) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,${gridOpacity}) 1px, transparent 1px)`,
          backgroundSize: `${gridSize}px ${gridSize}px`,
        }}
      />

      <motion.div
        className="absolute pointer-events-none rounded-full"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        style={{
          position: "absolute",
          left: glowPosition.x,
          top: glowPosition.y,
          width: glowW,
          height: glowH,
          background: `radial-gradient(circle, ${glowColor} 0%, rgba(100,50,180,0.04) 45%, transparent 70%)`,
          zIndex: 0,
        }}
      />
    </section>
  );
}