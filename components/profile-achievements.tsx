"use client";

import { motion } from "framer-motion";
import { Rocket, Flame, ClipboardList, Star, Dumbbell, PartyPopper } from "lucide-react";

const SPRING = { type: "spring" as const };

interface Achievement {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  unlocked: boolean;
}

const achievements: Achievement[] = [
  { id: "1", name: "First Step", icon: Rocket, description: "Complete your first habit", unlocked: true },
  { id: "2", name: "7-Day Streak", icon: Flame, description: "Maintain a 7-day streak", unlocked: true },
  { id: "3", name: "10 Habits", icon: ClipboardList, description: "Create 10 habits", unlocked: false },
  { id: "4", name: "Perfect Week", icon: Star, description: "Complete all habits in a week", unlocked: false },
  { id: "5", name: "30-Day Streak", icon: Dumbbell, description: "Maintain a 30-day streak", unlocked: false },
  { id: "6", name: "Month One", icon: PartyPopper, description: "Use Ascend for 30 days", unlocked: true },
];

export default function ProfileAchievements() {
  return (
    <motion.div
      className="bg-neutral-900/40 border border-white/5 rounded-lg p-6"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
    >
      <h3 className="text-sm font-bold text-white tracking-[0.2em] font-mono uppercase mb-5">
        Achievements
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {achievements.map((achievement, i) => (
          <motion.div
            key={achievement.id}
            className={`relative rounded-lg p-4 border transition-all duration-300 ${
              achievement.unlocked
                ? "bg-purple-600/10 border-purple-500/20"
                : "bg-white/5 border-white/5 opacity-40"
            }`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ...SPRING, stiffness: 500, damping: 22, delay: 0.35 + i * 0.06 }}
          >
            <div className="text-2xl mb-2 text-white/60">
              <achievement.icon className="size-6" />
            </div>
            <p className="text-xs font-mono font-bold text-white/80 mb-1">
              {achievement.name}
            </p>
            <p className="text-[10px] font-mono text-white/30">
              {achievement.description}
            </p>
            {achievement.unlocked && (
              <motion.div
                className="absolute top-2 right-2 w-2 h-2 rounded-full bg-purple-400"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ ...SPRING, stiffness: 500, damping: 22, delay: 0.5 + i * 0.06 }}
              />
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
