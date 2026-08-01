"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback } from "react";
import { FileText } from "lucide-react";

const SPRING = { type: "spring" as const };

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

interface HabitModalProps {
  habit: Habit | null;
  onClose: () => void;
  onToggle: (id: string) => void;
  onSaveNotes: (id: string, notes: string) => void;
}

export default function HabitModal({ habit, onClose, onToggle, onSaveNotes }: HabitModalProps) {
  const [notes, setNotes] = useState(habit?.notes ?? "");
  const [saved, setSaved] = useState(false);

  const handleSaveNotes = useCallback(() => {
    if (habit) {
      onSaveNotes(habit.id, notes);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  }, [habit, notes, onSaveNotes]);

  return (
    <AnimatePresence>
      {habit && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          onClick={onClose}
        >
          <motion.div
            className="bg-neutral-900 border border-white/10 rounded-lg p-6 w-full max-w-md mx-4"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ ...SPRING, stiffness: 400, damping: 22 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white font-mono tracking-wider">
                {habit.name}
              </h3>
              <motion.button
                className="text-white/30 hover:text-white transition-colors duration-300"
                onClick={onClose}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                ✕
              </motion.button>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-white/40 tracking-wider uppercase">
                  Status
                </span>
                <span
                  className={`text-xs font-mono ${habit.completed ? "text-purple-400" : "text-white/50"}`}
                >
                  {habit.completed ? "Completed" : "Pending"}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-white/40 tracking-wider uppercase">
                  Streak
                </span>
                <span className="text-xs font-mono text-purple-400">
                  {habit.streak} days
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-white/40 tracking-wider uppercase">
                  Progress
                </span>
                <span className="text-xs font-mono text-purple-400">
                  {habit.progress}%
                </span>
              </div>

              <div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-purple-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${habit.progress}%` }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-white/40 tracking-wider uppercase">
                  Last tracked
                </span>
                <span className="text-xs font-mono text-white/50">
                  {habit.time}
                </span>
              </div>

              <div className="border-t border-white/5 pt-4">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="size-3 text-white/40" />
                  <span className="text-xs font-mono text-white/60">Notes</span>
                </div>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add a note about this habit..."
                  className="w-full bg-white/5 border border-white/10 rounded-none px-3 py-2 text-sm text-white placeholder:text-white/30 font-mono focus:border-purple-500/50 focus:outline-none focus:ring-1 focus:ring-purple-500/30 transition-colors duration-300 resize-none"
                  rows={3}
                />
                <div className="flex items-center gap-3 mt-3">
                  <motion.button
                    className="px-4 py-1.5 bg-purple-600 border-2 border-purple-500/50 text-white text-[10px] font-bold tracking-[0.15em] font-mono hover:bg-purple-500 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ ...SPRING, stiffness: 400, damping: 17 }}
                    onClick={handleSaveNotes}
                  >
                    SAVE NOTES
                  </motion.button>
                  {saved && (
                    <motion.span
                      className="text-xs font-mono text-purple-400"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      Saved
                    </motion.span>
                  )}
                </div>
              </div>
            </div>

            <motion.button
              className="w-full py-2.5 bg-purple-600 border-2 border-purple-500/50 text-white text-xs font-bold tracking-[0.2em] font-mono hover:bg-purple-500 hover:border-purple-400 transition-all duration-300"
              onClick={() => {
                onToggle(habit.id);
                onClose();
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ ...SPRING, stiffness: 400, damping: 17 }}
            >
              {habit.completed ? "MARK INCOMPLETE" : "MARK COMPLETE"}
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}