"use client";

import { motion } from "framer-motion";

const TWEEN = { type: "tween" as const };
const SPRING = { type: "spring" as const };

const CATEGORIES = ["All", "Health", "Work", "Personal"];

interface HabitCategoryFilterProps {
  active: string;
  onSelect: (category: string) => void;
}

export default function HabitCategoryFilter({ active, onSelect }: HabitCategoryFilterProps) {
  return (
    <motion.div
      className="flex gap-2 flex-wrap"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...TWEEN, duration: 0.4, ease: "easeOut", delay: 0.15 }}
    >
      {CATEGORIES.map((category) => {
        const isActive = active === category;
        return (
          <motion.button
            key={category}
            className={`px-4 py-1.5 text-[10px] font-mono tracking-wider border transition-all duration-300 ${
              isActive
                ? "bg-purple-600 border-purple-500/50 text-white shadow-[0_0_8px_rgba(168,85,247,0.2)]"
                : "bg-white/5 border-white/10 text-white/40 hover:text-white/70 hover:border-white/20"
            }`}
            onClick={() => onSelect(category)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ ...SPRING, stiffness: 400, damping: 17 }}
          >
            {category}
          </motion.button>
        );
      })}
    </motion.div>
  );
}