"use client";

import { motion } from "framer-motion";
import { FileText } from "lucide-react";

const SPRING = { type: "spring" as const };
const TWEEN = { type: "tween" as const };

interface Habit {
  id: string;
  name: string;
  completed: boolean;
  streak: number;
  progress: number;
  time: string;
  category: string;
  notes: string;
}

interface HabitListProps {
  habits: Habit[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onSelect: (habit: Habit) => void;
}

export default function HabitList({ habits, onToggle, onDelete, onSelect }: HabitListProps) {
  if (habits.length === 0) {
    return (
      <motion.div
        className="flex flex-col items-center justify-center py-16 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <p className="text-white/30 text-sm font-mono tracking-wider">
          No habits yet. Add your first one above.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="space-y-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.4 }}
    >
      {habits.map((habit, i) => (
        <motion.div
          key={habit.id}
          className="flex items-center gap-4 bg-neutral-900/40 border border-white/5 rounded-lg p-4 cursor-pointer hover:border-purple-500/20 transition-colors duration-300"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ ...TWEEN, duration: 0.4, delay: 0.4 + i * 0.08, ease: "easeOut" }}
          whileHover={{ scale: 1.01, borderColor: "rgba(168,85,247,0.2)" }}
          onClick={() => onSelect(habit)}
        >
          <motion.button
            className="flex-shrink-0 w-5 h-5 border border-white/20 rounded flex items-center justify-center bg-white/5 hover:border-purple-500/50 transition-colors duration-300"
            onClick={(e) => {
              e.stopPropagation();
              onToggle(habit.id);
            }}
            whileTap={{ scale: 0.9 }}
            transition={{ ...SPRING, stiffness: 400, damping: 17 }}
          >
            {habit.completed && (
              <motion.span
                className="text-purple-400 text-xs"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ ...SPRING, stiffness: 500, damping: 22 }}
              >
                ✓
              </motion.span>
            )}
          </motion.button>

          <div className="flex-1 min-w-0">
            <p
              className={`text-sm font-mono ${habit.completed ? "text-white/40 line-through" : "text-white/80"}`}
            >
              {habit.name}
            </p>
            <div className="flex items-center gap-2 mt-0.5">
              <p className="text-[10px] font-mono text-white/25">
                {habit.time} · {habit.streak} day streak
              </p>
              <span className="text-[10px] font-mono text-white/20 bg-white/5 px-1.5 py-0.5 rounded border border-white/5">
                {habit.category}
              </span>
              {habit.notes && (
                <FileText className="size-3 text-white/20" />
              )}
            </div>
          </div>

          <div className="flex-shrink-0 w-20">
            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-purple-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${habit.progress}%` }}
                transition={{ duration: 0.6, delay: 0.5 + i * 0.05, ease: "easeOut" }}
              />
            </div>
          </div>

          <motion.button
            className="flex-shrink-0 text-white/20 hover:text-red-400 transition-colors duration-300 text-xs font-mono"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(habit.id);
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            ✕
          </motion.button>
        </motion.div>
      ))}
    </motion.div>
  );
}