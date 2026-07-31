"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import PixelEffects from "@/components/PixelEffects";
import { useEffect, useState } from "react";

const SPRING = { type: "spring" as const };
const TWEEN = { type: "tween" as const };

const PIXEL_PALETTE = [
  "#ffffff",
  "#e2e8f0",
  "#94a3b8",
  "#d8b4fe",
  "#c084fc",
  "#a855f7",
  "#7e22ce",
];

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
  return Array.from({ length: 15 }, () => ({
    left: Math.floor(rand() * cols) * GRID,
    top: Math.floor(rand() * rows) * GRID,
    delay: rand() * 1.5,
    duration: 3 + rand() * 2,
    opacity: 0.15 + rand() * 0.35,
    color: PIXEL_PALETTE[Math.floor(rand() * PIXEL_PALETTE.length)],
  }));
}

function pxShadow(values: string[]): string {
  return values.join(", ");
}

const sp = pxShadow;

export default function LoginPage() {
  const [formPixels, setFormPixels] = useState(() =>
    generateFormPixels(0, 0, 73)
  );

  useEffect(() => {
    let rafId = 0;
    function generate() {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setFormPixels(generateFormPixels(window.innerWidth, window.innerHeight, Date.now()));
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
  }, []);

  return (
    <div className="flex min-h-screen flex-col lg:flex-row overflow-x-hidden">
      <div className="relative flex w-full lg:w-[45%] xl:w-[35%] flex-col items-center justify-center bg-neutral-950 p-6 sm:p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-white/5 min-h-screen lg:min-h-0">
        
        <div 
          className="absolute inset-0 pointer-events-none" 
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }} 
        />

        <div
          className="absolute pointer-events-none w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] rounded-full"
          style={{
            right: "-10%",
            top: "-10%",
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

        <div className="hidden sm:block absolute bottom-[15%] right-[10%]" style={{ width: "4px", height: "4px" }}>
          <div style={{ boxShadow: sp([
            "0 0 0 0 #fff",
            "-6px 6px 0 0 #fff", "0px 6px 0 0 #fff", "6px 6px 0 0 #fff",
            "-10px 10px 0 0 #fff", "-6px 10px 0 0 #fff", "0px 10px 0 0 #fff", "6px 10px 0 0 #fff", "10px 10px 0 0 #fff",
            "-14px 14px 0 0 #fff", "-10px 14px 0 0 #fff", "-6px 14px 0 0 #fff", "0px 14px 0 0 #fff",
            "6px 14px 0 0 #fff", "10px 14px 0 0 #fff", "14px 14px 0 0 #fff",
          ]) }} />
        </div>

        <div className="hidden sm:block absolute top-[12%] left-[8%]" style={{ width: "4px", height: "4px" }}>
          <div style={{ boxShadow: sp(["0 0 0 0 #fff", "-8px 0 0 0 #fff", "8px 0 0 0 #fff", "0px -8px 0 0 #fff", "0px 8px 0 0 #fff"]) }} />
        </div>

        <div className="hidden sm:block absolute top-[60%] left-[5%]" style={{ width: "4px", height: "4px" }}>
          <div style={{ boxShadow: sp(["0 0 0 0 #fff", "-4px -2px 0 0 #fff", "4px -2px 0 0 #fff", "-2px 2px 0 0 #fff", "2px 2px 0 0 #fff"]) }} />
        </div>

        <motion.div
          className="w-full max-w-sm sm:max-w-md space-y-6 sm:space-y-8 z-10"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...SPRING, stiffness: 500, damping: 22, delay: 0.1 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-[0.2em] sm:tracking-[0.35em] font-mono">
              {"ASCEND".split("").map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...SPRING, stiffness: 500, damping: 25, delay: 0.15 + i * 0.03 }}
                >
                  {letter}
                </motion.span>
              ))}
            </h1>
          </motion.div>

          <motion.p
            className="text-white/50 text-xs sm:text-sm font-mono max-w-sm leading-relaxed"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...TWEEN, duration: 0.4, ease: [0.25, 0.1, 0.25, 1], delay: 0.5 }}
          >
            Sign in to continue your ascent. Enter your credentials to access your account.
          </motion.p>

          <motion.form
            className="space-y-4 sm:space-y-6"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...TWEEN, duration: 0.5, ease: "easeOut", delay: 0.6 }}
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="space-y-2">
              <label className="block text-xs font-medium text-white/60 font-mono tracking-wider uppercase">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                required
                className="w-full rounded-none border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-purple-500/50 focus:outline-none focus:ring-1 focus:ring-purple-500/30 transition-colors duration-300"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-medium text-white/60 font-mono tracking-wider uppercase">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                required
                className="w-full rounded-none border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-purple-500/50 focus:outline-none focus:ring-1 focus:ring-purple-500/30 transition-colors duration-300"
              />
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ ...SPRING, stiffness: 400, damping: 17 }}
            >
              <Button
                type="submit"
                variant="default"
                size="lg"
                className="w-full rounded-none border-2 border-purple-500/50 bg-purple-600 px-8 py-3 text-xs font-bold tracking-[0.2em] font-mono text-white hover:bg-purple-500 hover:border-purple-400 transition-all duration-300 shadow-[0_0_10px_rgba(168,85,247,0.2)] hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]"
              >
                SIGN IN
              </Button>
            </motion.div>
          </motion.form>

          <motion.div
            className="flex flex-col sm:flex-row gap-2 sm:gap-0 items-center justify-between text-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.4 }}
          >
            <a href="#" className="text-white/40 hover:text-white/70 font-mono transition-colors duration-300">
              Forgot password?
            </a>
            <a href="#" className="text-purple-400 hover:text-purple-300 font-mono transition-colors duration-300">
              Create account
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Sección Derecha (Visuales / Canvas) */}
      <div className="hidden lg:block lg:flex-1 relative bg-black min-h-[300px] lg:min-h-full">
        <PixelEffects
          pixelCount={60}
          seed={84}
          gridSize={32}
          pixelSize={4}
          glowColor="rgba(168,85,247,0.15)"
          glowPosition={{ x: "20%", y: "30%" }}
          glowSize="700px"
          className="absolute inset-0"
        />
      </div>
    </div>
  );
}