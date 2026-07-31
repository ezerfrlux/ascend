"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const SPRING = { type: "spring" as const };
const TWEEN = { type: "tween" as const };

export default function AddHabitForm({ onAdd }: { onAdd: (name: string) => void }) {
  const [name, setName] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    onAdd(name.trim());
    setName("");
  }

  return (
    <motion.form
      className="flex gap-3 items-center"
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...TWEEN, duration: 0.4, ease: "easeOut", delay: 0.3 }}
    >
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Add a new habit..."
        className="flex-1 bg-white/5 border border-white/10 rounded-none px-4 py-2.5 text-sm text-white placeholder:text-white/30 font-mono focus:border-purple-500/50 focus:outline-none focus:ring-1 focus:ring-purple-500/30 transition-colors duration-300"
      />
      <motion.button
        type="submit"
        className="px-5 py-2.5 bg-purple-600 border-2 border-purple-500/50 text-white text-xs font-bold tracking-[0.2em] font-mono hover:bg-purple-500 hover:border-purple-400 transition-all duration-300 shadow-[0_0_10px_rgba(168,85,247,0.2)] hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ ...SPRING, stiffness: 400, damping: 17 }}
      >
        ADD
      </motion.button>
    </motion.form>
  );
}