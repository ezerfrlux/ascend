"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const SPRING = { type: "spring" as const };
const TWEEN = { type: "tween" as const };

export default function ProfilePreferences() {
  const [theme, setTheme] = useState("dark");
  const [notifications, setNotifications] = useState({
    email: true,
    dailyReminder: true,
    weeklySummary: false,
  });

  return (
    <motion.div
      className="bg-neutral-900/40 border border-white/5 rounded-lg p-6"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...TWEEN, duration: 0.5, ease: "easeOut", delay: 0.2 }}
    >
      <h3 className="text-sm font-bold text-white tracking-[0.2em] font-mono uppercase mb-5">
        Preferences
      </h3>

      <div className="space-y-5">
        <div>
          <label className="block text-[10px] font-medium text-white/40 font-mono tracking-wider uppercase mb-2">
            Theme
          </label>
          <div className="flex gap-2">
            {["dark", "light"].map((t) => (
              <motion.button
                key={t}
                className={`px-4 py-2 text-xs font-mono tracking-wider border transition-all duration-300 ${
                  theme === t
                    ? "bg-purple-600 border-purple-500/50 text-white"
                    : "bg-white/5 border-white/10 text-white/40 hover:text-white/70"
                }`}
                onClick={() => setTheme(t)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ ...SPRING, stiffness: 400, damping: 17 }}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </motion.button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-medium text-white/40 font-mono tracking-wider uppercase mb-3">
            Notifications
          </label>
          <div className="space-y-2">
            {Object.entries(notifications).map(([key, value]) => (
              <motion.button
                key={key}
                className={`flex items-center justify-between w-full px-3 py-2 rounded-md border transition-all duration-300 ${
                  value
                    ? "bg-purple-600/10 border-purple-500/20 text-purple-400"
                    : "bg-white/5 border-white/10 text-white/40"
                }`}
                onClick={() =>
                  setNotifications((prev) => ({
                    ...prev,
                    [key]: !prev[key as keyof typeof notifications],
                  }))
                }
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                transition={{ ...SPRING, stiffness: 400, damping: 17 }}
              >
                <span className="text-xs font-mono">
                  {key === "email"
                    ? "Email"
                    : key === "dailyReminder"
                      ? "Daily Reminder"
                      : "Weekly Summary"}
                </span>
                <span
                  className={`w-8 h-4 rounded-full border transition-colors duration-300 ${
                    value ? "bg-purple-500 border-purple-400" : "bg-white/10 border-white/20"
                  }`}
                >
                  <span
                    className={`block h-3 w-3 rounded-full bg-white transition-transform duration-300 ${
                      value ? "translate-x-4" : "translate-x-0.5"
                    }`}
                  />
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
