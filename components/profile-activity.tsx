"use client";

import { motion } from "framer-motion";
import { Check, Plus, Flame, Pencil } from "lucide-react";

const TWEEN = { type: "tween" as const };

interface Activity {
  id: string;
  action: string;
  detail: string;
  time: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  iconBg: string;
}

const activities: Activity[] = [
  { id: "1", action: "Completed habit", detail: "Morning Run", time: "2 hours ago", icon: Check, iconColor: "text-purple-400", iconBg: "bg-purple-600/20 border-purple-500/20" },
  { id: "2", action: "Created habit", detail: "Read 30min", time: "Yesterday", icon: Plus, iconColor: "text-white/60", iconBg: "bg-white/5 border-white/10" },
  { id: "3", action: "Streak milestone", detail: "7-day streak reached", time: "2 days ago", icon: Flame, iconColor: "text-amber-400", iconBg: "bg-amber-600/20 border-amber-500/20" },
  { id: "4", action: "Completed habit", detail: "Meditate", time: "3 days ago", icon: Check, iconColor: "text-purple-400", iconBg: "bg-purple-600/20 border-purple-500/20" },
  { id: "5", action: "Updated profile", detail: "Changed display name", time: "5 days ago", icon: Pencil, iconColor: "text-white/40", iconBg: "bg-white/5 border-white/10" },
];

export default function ProfileActivity() {
  return (
    <motion.div
      className="bg-neutral-900/40 border border-white/5 rounded-lg p-6"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...TWEEN, duration: 0.5, ease: "easeOut", delay: 0.35 }}
    >
      <h3 className="text-sm font-bold text-white tracking-[0.2em] font-mono uppercase mb-5">
        Recent Activity
      </h3>

      <div className="space-y-0">
        {activities.map((activity, i) => (
          <motion.div
            key={activity.id}
            className="flex items-start gap-4 relative"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ...TWEEN, duration: 0.4, ease: "easeOut", delay: 0.4 + i * 0.08 }}
          >
            {i < activities.length - 1 && (
              <div className="absolute left-4 top-8 bottom-0 w-px bg-white/5" />
            )}
            <div
              className={`relative z-10 h-8 w-8 rounded-full flex items-center justify-center border shrink-0 ${activity.iconBg}`}
            >
              <activity.icon className={`size-4 ${activity.iconColor}`} />
            </div>
            <div className="flex-1 min-w-0 pb-4">
              <p className="text-sm font-mono text-white/80">{activity.action}</p>
              <p className="text-xs font-mono text-white/40 mt-0.5">{activity.detail}</p>
              <p className="text-[10px] font-mono text-white/25 mt-1">{activity.time}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}