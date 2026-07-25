"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

function pxShadow(values: string[]): string {
  return values.join(", ");
}

const GRID = 32;
const PIXEL = 4;

const lineH = Array.from(
  { length: 21 },
  (_, i) => `${(i - 10) * 4}px 0 0 0 #fff`,
);
const lineV = Array.from({ length: 11 }, (_, i) => `0 ${i * 4}px 0 0 #fff`);

const cornerTL = pxShadow([
  "0 0 0 0 #fff",
  "4px 0 0 0 #fff",
  "8px 0 0 0 #fff",
  "12px 0 0 0 #fff",
  "0 4px 0 0 #fff",
  "4px 4px 0 0 #fff",
  "8px 4px 0 0 #fff",
  "0 8px 0 0 #fff",
]);
const cornerTR = pxShadow([
  "0 0 0 0 #fff",
  "-4px 0 0 0 #fff",
  "-8px 0 0 0 #fff",
  "-12px 0 0 0 #fff",
  "0 4px 0 0 #fff",
  "-4px 4px 0 0 #fff",
  "-8px 4px 0 0 #fff",
  "0 8px 0 0 #fff",
]);
const cornerBL = pxShadow([
  "0 0 0 0 #fff",
  "4px 0 0 0 #fff",
  "8px 0 0 0 #fff",
  "12px 0 0 0 #fff",
  "0 -4px 0 0 #fff",
  "4px -4px 0 0 #fff",
  "8px -4px 0 0 #fff",
  "0 -8px 0 0 #fff",
]);
const cornerBR = pxShadow([
  "0 0 0 0 #fff",
  "-4px 0 0 0 #fff",
  "-8px 0 0 0 #fff",
  "-12px 0 0 0 #fff",
  "0 -4px 0 0 #fff",
  "-4px -4px 0 0 #fff",
  "-8px -4px 0 0 #fff",
  "0 -8px 0 0 #fff",
]);

function mkTransition(
  t: "spring" | "tween",
  params: Record<string, number | string | number[]>,
): Record<string, unknown> {
  return { type: t, ...params };
}

const cornerVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: (delay: number) => ({
    opacity: 0.2,
    scale: 1,
    transition: mkTransition("spring", { stiffness: 300, damping: 20, delay }),
  }),
};

export default function Hero() {
  const [pixels, setPixels] = useState<
    { left: number; top: number; delay: number; opacity: number; color: string }[]
  >([]);

  useEffect(() => {
    function generatePixels() {
      const cols = Math.ceil(window.innerWidth / GRID);
      const rows = Math.ceil(window.innerHeight / GRID);

      const colorPalette = [
        "#ffffff",
        "#e2e8f0",
        "#94a3b8",
        "#d8b4fe",
        "#c084fc",
        "#a855f7",
        "#7e22ce",
      ];

      const arr = Array.from({ length: 120 }, () => ({
        left: Math.floor(Math.random() * cols) * GRID,
        top: Math.floor(Math.random() * rows) * GRID,
        delay: Math.random() * 1.5,
        opacity: 0.25 + Math.random() * 0.75,
        color: colorPalette[Math.floor(Math.random() * colorPalette.length)],
      }));

      setPixels(arr);
    }

    generatePixels();
    window.addEventListener("resize", generatePixels);
    return () => window.removeEventListener("resize", generatePixels);
  }, []);

  const sectionRef = useRef(null);
  const shouldAnimate = true;
  const a = (v: boolean) => (v ? 1 : 0);

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col items-center justify-center min-h-screen bg-black overflow-hidden select-none"
    >
      {pixels.map((p, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, p.opacity, 0],
            scale: [0.2, 1, 0.2],
          }}
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

      <motion.div
        className="absolute top-[11%] left-[46%]"
        style={{ width: "4px", height: "4px" }}
        initial="hidden"
        animate={shouldAnimate ? "visible" : "hidden"}
        variants={cornerVariants}
        custom={0.4}
      >
        <div style={{ boxShadow: cornerTL }} />
      </motion.div>
      <motion.div
        className="absolute top-[11%] right-[46%]"
        style={{ width: "4px", height: "4px" }}
        initial="hidden"
        animate={shouldAnimate ? "visible" : "hidden"}
        variants={cornerVariants}
        custom={0.45}
      >
        <div style={{ boxShadow: cornerTR }} />
      </motion.div>
      <motion.div
        className="absolute bottom-[22%] left-[46%]"
        style={{ width: "4px", height: "4px" }}
        initial="hidden"
        animate={shouldAnimate ? "visible" : "hidden"}
        variants={cornerVariants}
        custom={0.5}
      >
        <div style={{ boxShadow: cornerBL }} />
      </motion.div>
      <motion.div
        className="absolute bottom-[22%] right-[46%]"
        style={{ width: "4px", height: "4px" }}
        initial="hidden"
        animate={shouldAnimate ? "visible" : "hidden"}
        variants={cornerVariants}
        custom={0.55}
      >
        <div style={{ boxShadow: cornerBR }} />
      </motion.div>

      <motion.div
        className="absolute top-[10.5%] left-[41%]"
        style={{ width: "120px", height: "4px" }}
        initial={{ scaleX: 0 }}
        animate={shouldAnimate ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
      >
        <div style={{ boxShadow: pxShadow(lineH) }} />
      </motion.div>
      <motion.div
        className="absolute bottom-[21.5%] left-[41%]"
        style={{ width: "120px", height: "4px" }}
        initial={{ scaleX: 0 }}
        animate={shouldAnimate ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
      >
        <div style={{ boxShadow: pxShadow(lineH) }} />
      </motion.div>
      <motion.div
        className="absolute left-[46.5%] top-[11%]"
        style={{ width: "4px", height: "80px" }}
        initial={{ scaleY: 0 }}
        animate={shouldAnimate ? { scaleY: 1 } : { scaleY: 0 }}
        transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
      >
        <div style={{ boxShadow: pxShadow(lineV) }} />
      </motion.div>
      <motion.div
        className="absolute right-[46.5%] top-[11%]"
        style={{ width: "4px", height: "80px" }}
        initial={{ scaleY: 0 }}
        animate={shouldAnimate ? { scaleY: 1 } : { scaleY: 0 }}
        transition={{ duration: 0.5, delay: 0.35, ease: "easeOut" }}
      >
        <div style={{ boxShadow: pxShadow(lineV) }} />
      </motion.div>

      {/* Contenido principal (Título, Párrafo y Botones) */}
      <div className="relative z-10 flex flex-col items-center gap-6 px-4 text-center">
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-[0.35em] font-mono whitespace-nowrap"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: a(shouldAnimate), y: shouldAnimate ? 0 : 12 }}
          transition={mkTransition("spring", {
            stiffness: 500,
            damping: 22,
            delay: 0.1,
          })}
        >
          {"ASCEND".split("").map((letter, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: a(shouldAnimate), y: shouldAnimate ? 0 : 8 }}
              transition={mkTransition("spring", {
                stiffness: 500,
                damping: 25,
                delay: 0.15 + i * 0.03,
              })}
            >
              {letter}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          className="text-white/40 text-sm md:text-base font-mono max-w-md leading-relaxed"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: a(shouldAnimate), y: shouldAnimate ? 0 : 8 }}
          transition={mkTransition("tween", {
            duration: 0.4,
            ease: [0.25, 0.1, 0.25, 1] as number[],
            delay: 0.5,
          })}
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
                transition: mkTransition("spring", {
                  stiffness: 500,
                  damping: 22,
                }),
              },
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 24px rgba(255,255,255,0.3)",
            }}
            whileTap={{ scale: 0.95 }}
            transition={mkTransition("spring", { stiffness: 400, damping: 17 })}
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
                transition: mkTransition("spring", {
                  stiffness: 500,
                  damping: 22,
                }),
              },
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 16px rgba(255,255,255,0.1)",
            }}
            whileTap={{ scale: 0.95 }}
            transition={mkTransition("spring", { stiffness: 400, damping: 17 })}
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