"use client";

import { motion } from "framer-motion";
import { useState, useCallback } from "react";
import Nav from "@/components/nav";
import StatsRow from "@/components/stats-row";
import AddHabitForm from "@/components/add-habit-form";
import HabitList from "@/components/habit-list";
import HabitModal from "@/components/habit-modal";

const TWEEN = { type: "tween" as const };

const GRID = 32;

function seedRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return s / 2147483647;
  };
}

function generateFormPixels(width: number, height: number, seed: number) {
  const rand = seedRandom(seed);
  const cols = Math.ceil(width / GRID);
  const rows = Math.ceil(height / GRID);
  return Array.from({ length: 12 }, () => ({
    left: Math.floor(rand() * cols) * GRID,
    top: Math.floor(rand() * rows) * GRID,
    delay: rand() * 1.5,
    duration: 3 + rand() * 2,
    opacity: 0.15 + rand() * 0.35,
    color: ["#ffffff", "#e2e8f0", "#94a3b8", "#d8b4fe", "#c084fc", "#a855f7", "#7e22ce"][
      Math.floor(rand() * 7)
    ],
  }));
}

function pxShadow(values: string[]): string {
  return values.join(", ");
}

const sp = pxShadow;

const initialHabits = [
  { id: "1", name: "Morning Run", completed: true, streak: 7, progress: 80, time: "6:00 AM" },
  { id: "2", name: "Read 30min", completed: false, streak: 3, progress: 60, time: "8:00 PM" },
  { id: "3", name: "Meditate", completed: true, streak: 12, progress: 100, time: "7:00 AM" },
  { id: "4", name: "Write Journal", completed: false, streak: 1, progress: 20, time: "9:00 PM" },
  { id: "5", name: "Code Practice", completed: true, streak: 5, progress: 75, time: "4:00 PM" },
];

export default function DashboardPage() {
  const [habits, setHabits] = useState(initialHabits);
  const [selectedHabit, setSelectedHabit] = useState<typeof initialHabits[0] | null>(null);
  const [formPixels] = useState(() => generateFormPixels(0, 0, 73));

  const addHabit = useCallback((name: string) => {
    const newHabit = {
      id: Date.now().toString(),
      name,
      completed: false,
      streak: 0,
      progress: 0,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setHabits((prev) => [newHabit, ...prev]);
  }, []);

  const toggleHabit = useCallback((id: string) => {
    setHabits((prev) =>
      prev.map((h) =>
        h.id === id ? { ...h, completed: !h.completed } : h
      )
    );
  }, []);

  const deleteHabit = useCallback((id: string) => {
    setHabits((prev) => prev.filter((h) => h.id !== id));
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-neutral-950">
      <Nav />

      <main className="relative flex-1 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }} />

        <div
          className="absolute pointer-events-none w-[500px] h-[500px] rounded-full"
          style={{
            right: "-8%",
            top: "-8%",
            background:
              "radial-gradient(circle, rgba(168,85,247,0.08) 0%, rgba(100,50,180,0.02) 45%, transparent 70%)",
          }}
        />

        {formPixels.map((p, i) => (
          <motion.div
            key={`fp-${p.left}-${p.top}-${i}`}
            className="absolute pointer-events-none"
            style={{
              left: p.left,
              top: p.top,
              width: 4,
              height: 4,
              background: p.color,
              boxShadow: p.color.includes("f") ? "0 0 4px rgba(168,85,247,0.3)" : "none",
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, p.opacity, 0], scale: [0.2, 1, 0.2] }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}

        <div className="absolute bottom-[12%] right-[8%]" style={{ width: "4px", height: "4px" }}>
          <div style={{ boxShadow: sp([
            "0 0 0 0 #fff",
            "-6px 6px 0 0 #fff", "0px 6px 0 0 #fff", "6px 6px 0 0 #fff",
            "-10px 10px 0 0 #fff", "-6px 10px 0 0 #fff", "0px 10px 0 0 #fff", "6px 10px 0 0 #fff", "10px 10px 0 0 #fff",
          ]) }} />
        </div>

        <div className="absolute top-[10%] left-[6%]" style={{ width: "4px", height: "4px" }}>
          <div style={{ boxShadow: sp(["0 0 0 0 #fff", "-8px 0 0 0 #fff", "8px 0 0 0 #fff", "0px -8px 0 0 #fff", "0px 8px 0 0 #fff"]) }} />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 py-8 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-[0.35em] font-mono whitespace-nowrap">
              DASHBOARD
            </h1>
            <p className="text-white/40 text-sm font-mono mt-2 max-w-md">
              Track your daily habits. Build consistency. Ascend beyond limits.
            </p>
          </div>

          <StatsRow />

          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...TWEEN, duration: 0.5, ease: "easeOut", delay: 0.25 }}
          >
            <AddHabitForm onAdd={addHabit} />
          </motion.div>

          <motion.div
            className="mt-6"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...TWEEN, duration: 0.5, ease: "easeOut", delay: 0.35 }}
          >
            <HabitList
              habits={habits}
              onToggle={toggleHabit}
              onDelete={deleteHabit}
              onSelect={setSelectedHabit}
            />
          </motion.div>
        </div>
      </main>

      <HabitModal
        habit={selectedHabit}
        onClose={() => setSelectedHabit(null)}
        onToggle={toggleHabit}
      />
    </div>
  );
}