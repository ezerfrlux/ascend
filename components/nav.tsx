"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Nav() {
  const router = useRouter();

  return (
    <motion.nav
      className="relative z-50 flex h-14 items-center justify-between border-b border-white/5 bg-neutral-950/80 px-6 backdrop-blur-md"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => router.push("/")}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="text-lg font-bold text-white tracking-[0.35em] font-mono">
          ASCEND
        </span>
      </motion.div>

      <div className="flex items-center gap-6">
        <motion.a
          href="/dashboard"
          className="text-xs font-mono tracking-wider text-white/50 hover:text-white transition-colors duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          DASHBOARD
        </motion.a>
        <motion.a
          href="#"
          className="text-xs font-mono tracking-wider text-white/50 hover:text-white transition-colors duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          HABITS
        </motion.a>
        <motion.div
          className="flex items-center gap-2 cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="h-7 w-7 rounded-full bg-purple-600/20 border border-purple-500/30 flex items-center justify-center">
            <span className="text-xs font-mono text-purple-400">U</span>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
}