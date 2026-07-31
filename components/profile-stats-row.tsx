"use client";

import { motion } from "framer-motion";

const SPRING = { type: "spring" as const };

interface ProfileStat {
  label: string;
  value: string;
  sub: string;
}

const stats: ProfileStat[] = [
  { label: "MEMBER SINCE", value: "Jan 2025", sub: "Welcome aboard" },
  { label: "HABITS DONE", value: "47", sub: "total completed" },
  { label: "LONGEST STREAK", value: "12", sub: "days" },
];

export default function ProfileStatsRow() {
  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-3 gap-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
    >
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          className="bg-neutral-900/60 border border-white/5 rounded-lg p-5"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...SPRING, stiffness: 500, damping: 22, delay: 0.15 + i * 0.1 }}
        >
          <p className="text-[10px] font-mono tracking-[0.2em] text-white/30 uppercase mb-2">
            {stat.label}
          </p>
          <p className="text-2xl font-bold text-white font-mono">{stat.value}</p>
          <p className="text-xs font-mono mt-1 text-purple-400">
            {stat.sub}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
}