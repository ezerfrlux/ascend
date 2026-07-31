"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import PixelEffects from "@/components/PixelEffects";

const SPRING = { type: "spring" as const };
const TWEEN = { type: "tween" as const };

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <div className="relative flex flex-1 flex-col items-center justify-center bg-neutral-950 p-8 lg:p-12">
        <motion.div
          className="w-full max-w-md space-y-8"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...SPRING, stiffness: 500, damping: 22, delay: 0.1 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-[0.35em] font-mono whitespace-nowrap">
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
            className="text-white/50 text-sm font-mono max-w-sm leading-relaxed"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...TWEEN, duration: 0.4, ease: [0.25, 0.1, 0.25, 1], delay: 0.5 }}
          >
            Sign in to continue your ascent. Enter your credentials to access your account.
          </motion.p>

          <motion.form
            className="space-y-6"
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
            className="flex items-center justify-between text-xs"
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

      <div className="flex-1 relative">
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