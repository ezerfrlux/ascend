"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const SPRING = { type: "spring" as const };

export default function DangerZone() {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="bg-red-500/5 border border-red-500/10 rounded-lg p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-red-400 tracking-[0.2em] font-mono uppercase">
          Danger Zone
        </h3>
      </div>
      <p className="text-xs font-mono text-white/30 mb-4">
        Once you delete your account, there is no going back. Please be certain.
      </p>

      <AnimatePresence>
        {!showConfirm ? (
          <motion.button
            className="px-4 py-2 bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold tracking-[0.15em] font-mono hover:bg-red-500/20 transition-all duration-300"
            onClick={() => setShowConfirm(true)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ ...SPRING, stiffness: 400, damping: 17 }}
          >
            DELETE ACCOUNT
          </motion.button>
        ) : (
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <p className="text-xs font-mono text-red-400/70">
              Are you sure? This cannot be undone.
            </p>
            <motion.button
              className="px-3 py-1.5 bg-red-500 border border-red-400/50 text-white text-[10px] font-bold tracking-[0.15em] font-mono hover:bg-red-400 transition-all duration-300"
              onClick={() => setShowConfirm(false)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ ...SPRING, stiffness: 400, damping: 17 }}
            >
              CONFIRM
            </motion.button>
            <motion.button
              className="px-3 py-1.5 bg-white/5 border border-white/10 text-white/50 text-[10px] font-bold tracking-[0.15em] font-mono hover:text-white/80 transition-all duration-300"
              onClick={() => setShowConfirm(false)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ ...SPRING, stiffness: 400, damping: 17 }}
            >
              CANCEL
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}