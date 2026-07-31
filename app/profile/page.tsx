"use client";

import { motion } from "framer-motion";
import { useState, useCallback } from "react";
import Nav from "@/components/nav";
import ProfileStatsRow from "@/components/profile-stats-row";
import ProfileForm from "@/components/profile-form";
import DangerZone from "@/components/danger-zone";

const TWEEN = { type: "tween" as const };

const GRID = 32;

function seedRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return s / 2147483647;
  };
}

function generateFormPixels(width: number, height: number, seed: number) {
  const rand = seedRandom(seed);
  const cols = Math.ceil(width / GRID);
  const rows = Math.ceil(height / GRID);
  return Array.from({ length: 12 }, () => ({
    left: Math.floor(rand() * cols) * GRID,
    top: Math.floor(rand() * rows) * GRID,
    delay: rand() * 1.5,
    duration: 3 + rand() * 2,
    opacity: 0.15 + rand() * 0.35,
    color: ["#ffffff", "#e2e8f0", "#94a3b8", "#d8b4fe", "#c084fc", "#a855f7", "#7e22ce"][
      Math.floor(rand() * 7)
    ],
  }));
}

function pxShadow(values: string[]): string {
  return values.join(", ");
}

const sp = pxShadow;

export default function ProfilePage() {
  const [formPixels] = useState(() => generateFormPixels(0, 0, 73));

  const handleSave = useCallback((data: { name: string; email: string }) => {
    console.log("Profile saved:", data);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-neutral-950">
      <Nav />

      <main className="relative flex-1 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }} />

        <div
          className="absolute pointer-events-none w-[500px] h-[500px] rounded-full"
          style={{
            right: "-8%",
            top: "-8%",
            background:
              "radial-gradient(circle, rgba(168,85,247,0.08) 0%, rgba(100,50,180,0.02) 45%, transparent 70%)",
          }}
        />

        {formPixels.map((p, i) => (
          <motion.div
            key={`fp-${p.left}-${p.top}-${i}`}
            className="absolute pointer-events-none"
            style={{
              left: p.left,
              top: p.top,
              width: 4,
              height: 4,
              background: p.color,
              boxShadow: p.color.includes("f") ? "0 0 4px rgba(168,85,247,0.3)" : "none",
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, p.opacity, 0], scale: [0.2, 1, 0.2] }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}

        <div className="absolute bottom-[12%] right-[8%]" style={{ width: "4px", height: "4px" }}>
          <div style={{ boxShadow: sp([
            "0 0 0 0 #fff",
            "-6px 6px 0 0 #fff", "0px 6px 0 0 #fff", "6px 6px 0 0 #fff",
            "-10px 10px 0 0 #fff", "-6px 10px 0 0 #fff", "0px 10px 0 0 #fff", "6px 10px 0 0 #fff", "10px 10px 0 0 #fff",
          ]) }} />
        </div>

        <div className="absolute top-[10%] left-[6%]" style={{ width: "4px", height: "4px" }}>
          <div style={{ boxShadow: sp(["0 0 0 0 #fff", "-8px 0 0 0 #fff", "8px 0 0 0 #fff", "0px -8px 0 0 #fff", "0px 8px 0 0 #fff"]) }} />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-4 py-8 lg:px-8">
          <div className="flex items-center gap-5 mb-8">
            <div className="h-14 w-14 rounded-full bg-purple-600/20 border border-purple-500/30 flex items-center justify-center">
              <span className="text-lg font-bold text-purple-400 font-mono">U</span>
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white tracking-[0.35em] font-mono whitespace-nowrap">
                PROFILE
              </h1>
              <p className="text-white/40 text-sm font-mono mt-1">
                user@example.com
              </p>
            </div>
          </div>

          <ProfileStatsRow />

          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...TWEEN, duration: 0.5, ease: "easeOut", delay: 0.25 }}
          >
            <ProfileForm onSave={handleSave} />
          </motion.div>

          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...TWEEN, duration: 0.5, ease: "easeOut", delay: 0.35 }}
          >
            <DangerZone />
          </motion.div>
        </div>
      </main>
    </div>
  );
}