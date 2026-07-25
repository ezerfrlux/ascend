"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useInView, type Variants } from "framer-motion";
import { Button } from "@/components/ui/button";

function pxShadow(values: string[]): string {
  return values.join(", ");
}

const GRID = 32;
const PIXEL = 4;
const PIXEL_COUNT = 120;
const SPRING = { type: "spring" as const };
const TWEEN = { type: "tween" as const };

const lineH = Array.from({ length: 21 }, (_, i) => `${(i - 10) * 4}px 0 0 0 #fff`);
const lineV = Array.from({ length: 11 }, (_, i) => `0 ${i * 4}px 0 0 #fff`);

function mkSpaced(base: string[], gap: number): string[] {
  return base.map((s) => s.replace(/0px/g, (parseInt(s.split(" ")[0] || "0") * gap).toString() + "px"));
}

const sp = pxShadow;

const cornerTL = sp([
  "0 0 0 0 #fff", "4px 0 0 0 #fff", "8px 0 0 0 #fff", "12px 0 0 0 #fff",
  "0 4px 0 0 #fff", "4px 4px 0 0 #fff", "8px 4px 0 0 #fff", "0 8px 0 0 #fff",
]);
const cornerTR = sp([
  "0 0 0 0 #fff", "-4px 0 0 0 #fff", "-8px 0 0 0 #fff", "-12px 0 0 0 #fff",
  "0 4px 0 0 #fff", "-4px 4px 0 0 #fff", "-8px 4px 0 0 #fff", "0 8px 0 0 #fff",
]);
const cornerBL = sp([
  "0 0 0 0 #fff", "4px 0 0 0 #fff", "8px 0 0 0 #fff", "12px 0 0 0 #fff",
  "0 -4px 0 0 #fff", "4px -4px 0 0 #fff", "8px -4px 0 0 #fff", "0 -8px 0 0 #fff",
]);
const cornerBR = sp([
  "0 0 0 0 #fff", "-4px 0 0 0 #fff", "-8px 0 0 0 #fff", "-12px 0 0 0 #fff",
  "0 -4px 0 0 #fff", "-4px -4px 0 0 #fff", "-8px -4px 0 0 #fff", "0 -8px 0 0 #fff",
]);

function seedRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return s / 2147483647;
  };
}

function generatePixels(width: number, height: number, seed: number) {
  const rand = seedRandom(seed);
  const cols = Math.ceil(width / GRID);
  const rows = Math.ceil(height / GRID);
  const palette = ["#ffffff", "#e2e8f0", "#94a3b8", "#d8b4fe", "#c084fc", "#a855f7", "#7e22ce"];
  return Array.from({ length: PIXEL_COUNT }, () => ({
    left: Math.floor(rand() * cols) * GRID,
    top: Math.floor(rand() * rows) * GRID,
    delay: rand() * 1.5,
    opacity: 0.25 + rand() * 0.75,
    color: palette[Math.floor(rand() * palette.length)],
  }));
}

function fadeScale(): Variants {
  return {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { ...SPRING, stiffness: 400, damping: 20 },
    },
  };
}

function frame(delay: number): Variants {
  return {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 0.2,
      scale: 1,
      transition: { ...SPRING, stiffness: 300, damping: 20, delay },
    },
  };
}

function popIn(delay: number): Variants {
  return {
    hidden: { opacity: 0, scale: 0.2 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { ...SPRING, stiffness: 300, damping: 22, delay },
    },
  };
}

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const shouldAnimate = !prefersReducedMotion && isInView;
  const a = (v: boolean) => (v ? 1 : 0);

  const [pixels, setPixels] = useState(() => generatePixels(0, 0, 42));

  useEffect(() => {
    let rafId = 0;
    function generate() {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setPixels(generatePixels(window.innerWidth, window.innerHeight, Date.now()));
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
    <section
      ref={sectionRef}
      aria-label="Ascend hero section"
      className="relative flex flex-col items-center justify-center min-h-screen bg-black overflow-hidden select-none"
    >
      {pixels.map((p, i) => (
        <motion.div
          key={`${p.left}-${p.top}-${i}`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, p.opacity, 0], scale: [0.2, 1, 0.2] }}
          transition={{
            duration: 2 + Math.random() * 2.5,
            delay: p.delay,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            left: p.left,
            top: p.top,
            width: PIXEL,
            height: PIXEL,
            background: p.color,
            boxShadow: p.color.includes("f") ? "0 0 6px rgba(168,85,247,0.4)" : "none",
          }}
        />
      ))}

      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <motion.div
        className="absolute pointer-events-none w-[600px] h-[600px] md:w-[800px] md:h-[800px] rounded-full"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        style={{
          background:
            "radial-gradient(circle, rgba(168,85,247,0.12) 0%, rgba(100,50,180,0.04) 45%, transparent 70%)",
        }}
      />

      <div className="absolute bottom-[22%] left-1/2 -translate-x-1/2">
        <motion.div
          style={{ width: "4px", height: "4px" }}
          initial="hidden"
          animate={shouldAnimate ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0, y: 10, scale: 0.85 },
            visible: {
              opacity: 0.35,
              y: 0,
              scale: 1,
              transition: { ...SPRING, stiffness: 60, damping: 12, delay: 0.3 },
            },
          }}
        >
          <div style={{ boxShadow: sp([
            "0 0 0 0 #fff",
            "-4px 4px 0 0 #fff", "0px 4px 0 0 #fff", "4px 4px 0 0 #fff",
            "-8px 8px 0 0 #fff", "-4px 8px 0 0 #fff", "0px 8px 0 0 #fff", "4px 8px 0 0 #fff", "8px 8px 0 0 #fff",
            "-12px 12px 0 0 #fff", "-8px 12px 0 0 #fff", "-4px 12px 0 0 #fff", "0px 12px 0 0 #fff",
            "4px 12px 0 0 #fff", "8px 12px 0 0 #fff", "12px 12px 0 0 #fff", "-16px 16px 0 0 #fff",
            "-12px 16px 0 0 #fff", "-8px 16px 0 0 #fff", "-4px 16px 0 0 #fff", "0px 16px 0 0 #fff",
            "4px 16px 0 0 #fff", "8px 16px 0 0 #fff", "12px 16px 0 0 #fff", "16px 16px 0 0 #fff",
            "-20px 20px 0 0 #fff", "-16px 20px 0 0 #fff", "-12px 20px 0 0 #fff", "-8px 20px 0 0 #fff",
            "-4px 20px 0 0 #fff", "0px 20px 0 0 #fff", "4px 20px 0 0 #fff", "8px 20px 0 0 #fff",
            "12px 20px 0 0 #fff", "16px 20px 0 0 #fff", "20px 20px 0 0 #fff",
          ]) }} />
        </motion.div>
      </div>

      <motion.div className="absolute top-[14%] left-[12%]" style={{ width: "4px", height: "4px" }} initial="hidden" animate={shouldAnimate ? "visible" : "hidden"} variants={popIn(0)}>
        <div style={{ boxShadow: sp(["0 0 0 0 #fff", "-12px 0 0 0 #fff", "12px 0 0 0 #fff", "0px -12px 0 0 #fff", "0px 12px 0 0 #fff", "-8px -8px 0 0 #fff", "8px -8px 0 0 #fff", "-8px 8px 0 0 #fff", "8px 8px 0 0 #fff"]) }} />
      </motion.div>
      <motion.div className="absolute top-[10%] right-[10%]" style={{ width: "4px", height: "4px" }} initial="hidden" animate={shouldAnimate ? "visible" : "hidden"} variants={popIn(0.05)}>
        <div style={{ boxShadow: sp(["0 0 0 0 #fff", "-8px 0 0 0 #fff", "8px 0 0 0 #fff", "0px -8px 0 0 #fff", "0px 8px 0 0 #fff"]) }} />
      </motion.div>
      <motion.div className="absolute top-[22%] left-[6%]" style={{ width: "4px", height: "4px" }} initial="hidden" animate={shouldAnimate ? "visible" : "hidden"} variants={popIn(0.1)}>
        <div style={{ boxShadow: sp(["0 0 0 0 #fff", "-6px -3px 0 0 #fff", "6px -3px 0 0 #fff", "-3px 3px 0 0 #fff", "3px 3px 0 0 #fff", "0px 6px 0 0 #fff"]) }} />
      </motion.div>
      <motion.div className="absolute top-[18%] right-[6%]" style={{ width: "4px", height: "4px" }} initial="hidden" animate={shouldAnimate ? "visible" : "hidden"} variants={popIn(0.15)}>
        <div style={{ boxShadow: sp(["0 0 0 0 #fff", "-4px -2px 0 0 #fff", "4px -2px 0 0 #fff", "-2px 2px 0 0 #fff", "2px 2px 0 0 #fff"]) }} />
      </motion.div>
      <motion.div className="absolute top-[28%] left-[45%]" style={{ width: "4px", height: "4px" }} initial="hidden" animate={shouldAnimate ? "visible" : "hidden"} variants={popIn(0.2)}>
        <div style={{ boxShadow: sp(["0 0 0 0 #fff", "-8px 0 0 0 #fff", "8px 0 0 0 #fff", "0px -8px 0 0 #fff", "0px 8px 0 0 #fff"]) }} />
      </motion.div>
      <motion.div className="absolute top-[8%] left-[40%]" style={{ width: "4px", height: "4px" }} initial="hidden" animate={shouldAnimate ? "visible" : "hidden"} variants={popIn(0.25)}>
        <div style={{ boxShadow: sp(["0 0 0 0 #fff", "-3px -2px 0 0 #fff", "3px -2px 0 0 #fff", "-2px 2px 0 0 #fff", "2px 2px 0 0 #fff"]) }} />
      </motion.div>
      <motion.div className="absolute top-[32%] right-[20%]" style={{ width: "4px", height: "4px" }} initial="hidden" animate={shouldAnimate ? "visible" : "hidden"} variants={popIn(0.3)}>
        <div style={{ boxShadow: sp(["0 0 0 0 #fff", "-4px -2px 0 0 #fff", "4px -2px 0 0 #fff", "-2px 2px 0 0 #fff", "2px 2px 0 0 #fff"]) }} />
      </motion.div>
      <motion.div className="absolute top-[6%] left-[65%]" style={{ width: "4px", height: "4px" }} initial="hidden" animate={shouldAnimate ? "visible" : "hidden"} variants={popIn(0.35)}>
        <div style={{ boxShadow: sp(["0 0 0 0 #fff", "-3px -2px 0 0 #fff", "3px -2px 0 0 #fff", "-3px 2px 0 0 #fff", "3px 2px 0 0 #fff"]) }} />
      </motion.div>
      <motion.div className="absolute top-[38%] right-[8%]" style={{ width: "4px", height: "4px" }} initial="hidden" animate={shouldAnimate ? "visible" : "hidden"} variants={popIn(0.4)}>
        <div style={{ boxShadow: sp(["0 0 0 0 #fff", "-3px -2px 0 0 #fff", "3px -2px 0 0 #fff", "-2px 2px 0 0 #fff", "2px 2px 0 0 #fff"]) }} />
      </motion.div>
      <motion.div className="absolute top-[25%] left-[55%]" style={{ width: "4px", height: "4px" }} initial="hidden" animate={shouldAnimate ? "visible" : "hidden"} variants={fadeScale()}>
        <div style={{ boxShadow: sp(["0 0 0 0 #fff", "-3px 0 0 0 #fff", "3px 0 0 0 #fff", "0px -3px 0 0 #fff", "0px 3px 0 0 #fff", "-3px -3px 0 0 #fff", "3px -3px 0 0 #fff", "-3px 3px 0 0 #fff", "3px 3px 0 0 #fff"]) }} />
      </motion.div>
      <motion.div className="absolute top-[16%] left-[30%]" style={{ width: "4px", height: "4px" }} initial="hidden" animate={shouldAnimate ? "visible" : "hidden"} variants={popIn(0.5)}>
        <div style={{ boxShadow: sp(["0 0 0 0 #fff", "-8px 0 0 0 #fff", "8px 0 0 0 #fff", "0px -8px 0 0 #fff", "0px 8px 0 0 #fff"]) }} />
      </motion.div>
      <motion.div className="absolute top-[42%] right-[38%]" style={{ width: "4px", height: "4px" }} initial="hidden" animate={shouldAnimate ? "visible" : "hidden"} variants={popIn(0.55)}>
        <div style={{ boxShadow: sp(["0 0 0 0 #fff", "-4px -2px 0 0 #fff", "4px -2px 0 0 #fff", "-2px 2px 0 0 #fff", "2px 2px 0 0 #fff"]) }} />
      </motion.div>
      <motion.div className="absolute top-[50%] right-[12%]" style={{ width: "4px", height: "4px" }} initial="hidden" animate={shouldAnimate ? "visible" : "hidden"} variants={popIn(0.55)}>
        <div style={{ boxShadow: sp(["0 0 0 0 #fff", "-6px -3px 0 0 #fff", "6px -3px 0 0 #fff", "-3px 3px 0 0 #fff", "3px 3px 0 0 #fff", "0px 6px 0 0 #fff"]) }} />
      </motion.div>
      <motion.div className="absolute top-[55%] left-[18%]" style={{ width: "4px", height: "4px" }} initial="hidden" animate={shouldAnimate ? "visible" : "hidden"} variants={popIn(0.6)}>
        <div style={{ boxShadow: sp(["0 0 0 0 #fff", "-8px 0 0 0 #fff", "8px 0 0 0 #fff", "0px -8px 0 0 #fff", "0px 8px 0 0 #fff"]) }} />
      </motion.div>
      <motion.div className="absolute top-[36%] left-[75%]" style={{ width: "4px", height: "4px" }} initial="hidden" animate={shouldAnimate ? "visible" : "hidden"} variants={popIn(0.65)}>
        <div style={{ boxShadow: sp(["0 0 0 0 #fff", "-3px -2px 0 0 #fff", "3px -2px 0 0 #fff", "-3px 2px 0 0 #fff", "3px 2px 0 0 #fff"]) }} />
      </motion.div>
      <motion.div className="absolute bottom-[38%] left-[15%]" style={{ width: "4px", height: "4px" }} initial="hidden" animate={shouldAnimate ? "visible" : "hidden"} variants={popIn(0.7)}>
        <div style={{ boxShadow: sp(["0 0 0 0 #fff", "-2px 0 0 0 #fff", "2px 0 0 0 #fff", "0px 2px 0 0 #fff"]) }} />
      </motion.div>
      <motion.div className="absolute bottom-[34%] left-[82%]" style={{ width: "4px", height: "4px" }} initial="hidden" animate={shouldAnimate ? "visible" : "hidden"} variants={popIn(0.75)}>
        <div style={{ boxShadow: sp(["0 0 0 0 #fff", "-2px 0 0 0 #fff", "2px 0 0 0 #fff", "0px 2px 0 0 #fff"]) }} />
      </motion.div>
      <motion.div className="absolute bottom-[42%] right-[20%]" style={{ width: "4px", height: "4px" }} initial="hidden" animate={shouldAnimate ? "visible" : "hidden"} variants={popIn(0.8)}>
        <div style={{ boxShadow: sp(["0 0 0 0 #fff", "-4px -2px 0 0 #fff", "4px -2px 0 0 #fff", "-2px 2px 0 0 #fff", "2px 2px 0 0 #fff"]) }} />
      </motion.div>
      <motion.div className="absolute bottom-[28%] left-[30%]" style={{ width: "4px", height: "4px" }} initial="hidden" animate={shouldAnimate ? "visible" : "hidden"} variants={popIn(0.85)}>
        <div style={{ boxShadow: sp(["0 0 0 0 #fff", "-3px -2px 0 0 #fff", "3px -2px 0 0 #fff", "-3px 2px 0 0 #fff", "3px 2px 0 0 #fff"]) }} />
      </motion.div>
      <motion.div className="absolute bottom-[40%] right-[30%]" style={{ width: "4px", height: "4px" }} initial="hidden" animate={shouldAnimate ? "visible" : "hidden"} variants={popIn(0.85)}>
        <div style={{ boxShadow: sp(["0 0 0 0 #fff", "-5px 0 0 0 #fff", "5px 0 0 0 #fff", "0px -5px 0 0 #fff", "0px 5px 0 0 #fff"]) }} />
      </motion.div>
      <motion.div className="absolute bottom-[18%] left-[10%]" style={{ width: "4px", height: "4px" }} initial="hidden" animate={shouldAnimate ? "visible" : "hidden"} variants={popIn(0.9)}>
        <div style={{ boxShadow: sp(["0 0 0 0 #fff", "-3px 0 0 0 #fff", "3px 0 0 0 #fff", "0px -3px 0 0 #fff", "0px 3px 0 0 #fff", "-3px -3px 0 0 #fff", "3px -3px 0 0 #fff", "-3px 3px 0 0 #fff", "3px 3px 0 0 #fff"]) }} />
      </motion.div>
      <motion.div className="absolute bottom-[22%] right-[10%]" style={{ width: "4px", height: "4px" }} initial="hidden" animate={shouldAnimate ? "visible" : "hidden"} variants={popIn(0.9)}>
        <div style={{ boxShadow: sp(["0 0 0 0 #fff", "-3px 0 0 0 #fff", "3px 0 0 0 #fff", "0px -3px 0 0 #fff", "0px 3px 0 0 #fff", "-3px -3px 0 0 #fff", "3px -3px 0 0 #fff", "-3px 3px 0 0 #fff", "3px 3px 0 0 #fff"]) }} />
      </motion.div>
      <motion.div className="absolute top-[45%] left-[10%]" style={{ width: "4px", height: "4px" }} initial="hidden" animate={shouldAnimate ? "visible" : "hidden"} variants={popIn(0.95)}>
        <div style={{ boxShadow: sp(["0 0 0 0 #fff", "-3px -2px 0 0 #fff", "3px -2px 0 0 #fff", "-2px 2px 0 0 #fff", "2px 2px 0 0 #fff"]) }} />
      </motion.div>
      <motion.div className="absolute top-[40%] right-[8%]" style={{ width: "4px", height: "4px" }} initial="hidden" animate={shouldAnimate ? "visible" : "hidden"} variants={popIn(0.95)}>
        <div style={{ boxShadow: sp(["0 0 0 0 #fff", "-2px 0 0 0 #fff", "2px 0 0 0 #fff", "0px 2px 0 0 #fff"]) }} />
      </motion.div>
      <motion.div className="absolute top-[55%] left-[8%]" style={{ width: "4px", height: "4px" }} initial="hidden" animate={shouldAnimate ? "visible" : "hidden"} variants={popIn(1.0)}>
        <div style={{ boxShadow: sp(["0 0 0 0 #fff", "-4px -2px 0 0 #fff", "4px -2px 0 0 #fff", "-2px 2px 0 0 #fff", "2px 2px 0 0 #fff"]) }} />
      </motion.div>
      <motion.div className="absolute top-[52%] right-[5%]" style={{ width: "4px", height: "4px" }} initial="hidden" animate={shouldAnimate ? "visible" : "hidden"} variants={popIn(1.0)}>
        <div style={{ boxShadow: sp(["0 0 0 0 #fff", "-3px -2px 0 0 #fff", "3px -2px 0 0 #fff", "-3px 2px 0 0 #fff", "3px 2px 0 0 #fff"]) }} />
      </motion.div>
      <motion.div className="absolute top-[60%] left-[5%]" style={{ width: "4px", height: "4px" }} initial="hidden" animate={shouldAnimate ? "visible" : "hidden"} variants={popIn(1.05)}>
        <div style={{ boxShadow: sp(["0 0 0 0 #fff", "-3px -2px 0 0 #fff", "3px -2px 0 0 #fff", "-2px 2px 0 0 #fff", "2px 2px 0 0 #fff"]) }} />
      </motion.div>
      <motion.div className="absolute top-[35%] left-[90%]" style={{ width: "4px", height: "4px" }} initial="hidden" animate={shouldAnimate ? "visible" : "hidden"} variants={popIn(1.05)}>
        <div style={{ boxShadow: sp(["0 0 0 0 #fff", "-2px 0 0 0 #fff", "2px 0 0 0 #fff", "0px 2px 0 0 #fff"]) }} />
      </motion.div>
      <motion.div className="absolute bottom-[30%] left-[38%]" style={{ width: "4px", height: "4px" }} initial="hidden" animate={shouldAnimate ? "visible" : "hidden"} variants={popIn(1.1)}>
        <div style={{ boxShadow: sp(["0 -8px 0 0 #fff", "0 -4px 0 0 #fff", "-4px 0 0 0 #fff", "0px 0 0 0 #fff", "4px 0 0 0 #fff", "-2px 4px 0 0 #fff", "2px 4px 0 0 #fff"]) }} />
      </motion.div>
      <motion.div className="absolute bottom-[30%] right-[38%]" style={{ width: "4px", height: "4px" }} initial="hidden" animate={shouldAnimate ? "visible" : "hidden"} variants={popIn(1.15)}>
        <div style={{ boxShadow: sp(["0 -8px 0 0 #fff", "0 -4px 0 0 #fff", "-4px 0 0 0 #fff", "0px 0 0 0 #fff", "4px 0 0 0 #fff", "-2px 4px 0 0 #fff", "2px 4px 0 0 #fff"]) }} />
      </motion.div>

      <motion.div className="absolute top-[11%] left-[46%]" style={{ width: "4px", height: "4px" }} initial="hidden" animate={shouldAnimate ? "visible" : "hidden"} variants={frame(0.85)}>
        <div style={{ boxShadow: cornerTL }} />
      </motion.div>
      <motion.div className="absolute top-[11%] right-[46%]" style={{ width: "4px", height: "4px" }} initial="hidden" animate={shouldAnimate ? "visible" : "hidden"} variants={frame(0.9)}>
        <div style={{ boxShadow: cornerTR }} />
      </motion.div>
      <motion.div className="absolute bottom-[22%] left-[46%]" style={{ width: "4px", height: "4px" }} initial="hidden" animate={shouldAnimate ? "visible" : "hidden"} variants={frame(0.95)}>
        <div style={{ boxShadow: cornerBL }} />
      </motion.div>
      <motion.div className="absolute bottom-[22%] right-[46%]" style={{ width: "4px", height: "4px" }} initial="hidden" animate={shouldAnimate ? "visible" : "hidden"} variants={frame(1.0)}>
        <div style={{ boxShadow: cornerBR }} />
      </motion.div>

      <motion.div className="absolute top-[10.5%] left-[41%]" style={{ width: "120px", height: "4px" }} initial={{ scaleX: 0 }} animate={shouldAnimate ? { scaleX: 1 } : { scaleX: 0 }} transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}>
        <div style={{ boxShadow: sp(lineH) }} />
      </motion.div>
      <motion.div className="absolute bottom-[21.5%] left-[41%]" style={{ width: "120px", height: "4px" }} initial={{ scaleX: 0 }} animate={shouldAnimate ? { scaleX: 1 } : { scaleX: 0 }} transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}>
        <div style={{ boxShadow: sp(lineH) }} />
      </motion.div>
      <motion.div className="absolute left-[46.5%] top-[11%]" style={{ width: "4px", height: "80px" }} initial={{ scaleY: 0 }} animate={shouldAnimate ? { scaleY: 1 } : { scaleY: 0 }} transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}>
        <div style={{ boxShadow: sp(lineV) }} />
      </motion.div>
      <motion.div className="absolute right-[46.5%] top-[11%]" style={{ width: "4px", height: "80px" }} initial={{ scaleY: 0 }} animate={shouldAnimate ? { scaleY: 1 } : { scaleY: 0 }} transition={{ duration: 0.5, delay: 0.35, ease: "easeOut" }}>
        <div style={{ boxShadow: sp(lineV) }} />
      </motion.div>

      <div className="relative z-10 flex flex-col items-center gap-6 px-4 text-center">
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-[0.35em] font-mono whitespace-nowrap"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: a(shouldAnimate), y: shouldAnimate ? 0 : 12 }}
          transition={{ ...SPRING, stiffness: 500, damping: 22, delay: 0.1 }}
        >
          {"ASCEND".split("").map((letter, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: a(shouldAnimate), y: shouldAnimate ? 0 : 8 }}
              transition={{ ...SPRING, stiffness: 500, damping: 25, delay: 0.15 + i * 0.03 }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          className="text-white/40 text-sm md:text-base font-mono max-w-md leading-relaxed"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: a(shouldAnimate), y: shouldAnimate ? 0 : 8 }}
          transition={{ ...TWEEN, duration: 0.4, ease: [0.25, 0.1, 0.25, 1], delay: 0.5 }}
        >
          Embark on a journey beyond the ordinary. Ascend through challenges,
          rise above limitations, and claim the summit of your potential.
        </motion.p>

        <motion.div
          className="flex gap-4"
          initial="hidden"
          animate={shouldAnimate ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1, delayChildren: 0.65 },
            },
          }}
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { ...SPRING, stiffness: 500, damping: 22 },
              },
            }}
            whileHover={{ scale: 1.05, boxShadow: "0 0 24px rgba(255,255,255,0.3)" }}
            whileTap={{ scale: 0.95 }}
            transition={{ ...SPRING, stiffness: 400, damping: 17 }}
          >
            <Button
              variant="default"
              size="lg"
              className="rounded-none border-2 border-white bg-white px-8 py-3 text-xs font-bold tracking-[0.2em] font-mono text-black hover:bg-white/90 hover:border-white transition-all duration-300 shadow-[0_0_10px_rgba(255,255,255,0.15)] hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]"
            >
              GET STARTED
            </Button>
          </motion.div>
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { ...SPRING, stiffness: 500, damping: 22 },
              },
            }}
            whileHover={{ scale: 1.05, boxShadow: "0 0 16px rgba(255,255,255,0.1)" }}
            whileTap={{ scale: 0.95 }}
            transition={{ ...SPRING, stiffness: 400, damping: 17 }}
          >
            <Button
              variant="outline"
              size="lg"
              className="rounded-none border-2 border-white/50 bg-transparent px-8 py-3 text-xs font-bold tracking-[0.2em] font-mono text-white hover:bg-white/10 hover:text-white hover:border-white transition-all duration-300 shadow-[0_0_10px_rgba(255,255,255,0.15)] hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]"
            >
              SIGN IN
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
