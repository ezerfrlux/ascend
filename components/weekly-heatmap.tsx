"use client";

import { motion } from "framer-motion";

const TWEEN = { type: "tween" as const };

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

interface HeatmapEntry {
  day: string;
  completed: boolean;
  habitName: string;
}

const heatmapData: HeatmapEntry[] = [
  { day: "Mon", completed: true, habitName: "Morning Run" },
  { day: "Mon", completed: false, habitName: "Read 30min" },
  { day: "Mon", completed: true, habitName: "Meditate" },
  { day: "Tue", completed: true, habitName: "Morning Run" },
  { day: "Tue", completed: true, habitName: "Read 30min" },
  { day: "Tue", completed: false, habitName: "Meditate" },
  { day: "Wed", completed: true, habitName: "Morning Run" },
  { day: "Wed", completed: true, habitName: "Read 30min" },
  { day: "Wed", completed: true, habitName: "Meditate" },
  { day: "Thu", completed: false, habitName: "Morning Run" },
  { day: "Thu", completed: true, habitName: "Read 30min" },
  { day: "Thu", completed: true, habitName: "Meditate" },
  { day: "Fri", completed: true, habitName: "Morning Run" },
  { day: "Fri", completed: false, habitName: "Read 30min" },
  { day: "Fri", completed: true, habitName: "Meditate" },
  { day: "Sat", completed: true, habitName: "Morning Run" },
  { day: "Sat", completed: true, habitName: "Read 30min" },
  { day: "Sat", completed: true, habitName: "Meditate" },
  { day: "Sun", completed: false, habitName: "Morning Run" },
  { day: "Sun", completed: false, habitName: "Read 30min" },
  { day: "Sun", completed: true, habitName: "Meditate" },
];

function getIntensity(completed: boolean, dayIndex: number, habitIndex: number): number {
  if (!completed) return 0;
  const base = 0.3;
  const dayBonus = (dayIndex / 6) * 0.2;
  const habitBonus = (habitIndex / 2) * 0.1;
  return Math.min(base + dayBonus + habitBonus, 1);
}

export default function WeeklyHeatmap() {
  const habits = ["Morning Run", "Read 30min", "Meditate"];

  return (
    <motion.div
      className="bg-neutral-900/40 border border-white/5 rounded-lg p-6"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...TWEEN, duration: 0.5, ease: "easeOut", delay: 0.2 }}
    >
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-sm font-bold text-white tracking-[0.2em] font-mono uppercase">
          Weekly Heatmap
        </h3>
        <span className="text-[10px] font-mono text-white/25">
          3 habits · 7 days
        </span>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[420px]">
          <div className="flex gap-1 mb-2 pl-16">
            {DAYS.map((day, i) => (
              <div
                key={day}
                className="flex-1 text-center text-[10px] font-mono text-white/30"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="space-y-1.5">
            {habits.map((habit, habitIdx) => (
              <div key={habit} className="flex items-center gap-1">
                <div className="w-16 shrink-0 text-[10px] font-mono text-white/40 truncate pr-2">
                  {habit}
                </div>
                <div className="flex gap-1 flex-1">
                  {DAYS.map((day, dayIdx) => {
                    const entry = heatmapData.find(
                      (e) => e.day === day && e.habitName === habit
                    );
                    const completed = entry?.completed ?? false;
                    const intensity = getIntensity(completed, dayIdx, habitIdx);

                    return (
                      <motion.div
                        key={`${habit}-${day}`}
                        className="flex-1 h-8 rounded-sm border border-white/5 cursor-pointer transition-colors duration-200 hover:border-white/20"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ ...TWEEN, duration: 0.3, delay: 0.3 + habitIdx * 0.08 + dayIdx * 0.04 }}
                        style={{
                          backgroundColor: completed
                            ? `rgba(168, 85, 247, ${intensity})`
                            : "rgba(255, 255, 255, 0.03)",
                          borderColor: completed
                            ? `rgba(168, 85, 247, ${intensity * 0.5})`
                            : "rgba(255, 255, 255, 0.05)",
                        }}
                        whileHover={{ scale: 1.15, zIndex: 10 }}
                      >
                        {completed && (
                          <div className="flex items-center justify-center h-full">
                            <span className="text-[8px] text-white/80 font-mono">✓</span>
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 mt-4 pt-3 border-t border-white/5">
        <span className="text-[10px] font-mono text-white/25">Less</span>
        {[0.05, 0.15, 0.3, 0.5, 0.7].map((level, i) => (
          <div
            key={i}
            className="w-4 h-4 rounded-sm border border-white/5"
            style={{
              backgroundColor: `rgba(168, 85, 247, ${level})`,
              borderColor: `rgba(168, 85, 247, ${level * 0.5})`,
            }}
          />
        ))}
        <span className="text-[10px] font-mono text-white/25">More</span>
      </div>
    </motion.div>
  );
}