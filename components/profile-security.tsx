"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ShieldCheck, ShieldAlert, Key, Eye, EyeOff, Trash2 } from "lucide-react";

const SPRING = { type: "spring" as const };
const TWEEN = { type: "tween" as const };

export default function ProfileSecurity() {
  const [showPasswords, setShowPasswords] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [sessions] = useState([
    { id: "1", device: "Chrome on Linux", location: "Madrid, ES", current: true, lastActive: "Just now" },
    { id: "2", device: "Firefox on Android", location: "Madrid, ES", current: false, lastActive: "2 hours ago" },
  ]);

  return (
    <motion.div
      className="bg-neutral-900/40 border border-white/5 rounded-lg p-6"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...TWEEN, duration: 0.5, ease: "easeOut", delay: 0.4 }}
    >
      <h3 className="text-sm font-bold text-white tracking-[0.2em] font-mono uppercase mb-5">
        Security
      </h3>

      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShieldCheck className="size-4 text-purple-400" />
            <div>
              <p className="text-xs font-mono text-white/80">Two-Factor Authentication</p>
              <p className="text-[10px] font-mono text-white/30">Extra protection for your account</p>
            </div>
          </div>
          <motion.button
            className={`relative h-5 w-9 rounded-full border transition-colors duration-300 ${
              twoFactorEnabled ? "bg-purple-600 border-purple-500/50" : "bg-white/10 border-white/20"
            }`}
            onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
            whileTap={{ scale: 0.95 }}
            transition={{ ...SPRING, stiffness: 400, damping: 17 }}
          >
            <span
              className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform duration-300 ${
                twoFactorEnabled ? "translate-x-4" : "translate-x-0.5"
              }`}
            />
          </motion.button>
        </div>

        <div className="space-y-2">
          <label className="block text-[10px] font-medium text-white/40 font-mono tracking-wider uppercase">
            Change Password
          </label>
          <div className="relative">
            <input
              type={showPasswords ? "text" : "password"}
              placeholder="Current password"
              className="w-full bg-white/5 border border-white/10 rounded-none px-4 py-2.5 text-sm text-white placeholder:text-white/30 font-mono focus:border-purple-500/50 focus:outline-none focus:ring-1 focus:ring-purple-500/30 transition-colors duration-300 pr-10"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors duration-300"
              onClick={() => setShowPasswords(!showPasswords)}
            >
              {showPasswords ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
          <div className="relative">
            <input
              type={showPasswords ? "text" : "password"}
              placeholder="New password"
              className="w-full bg-white/5 border border-white/10 rounded-none px-4 py-2.5 text-sm text-white placeholder:text-white/30 font-mono focus:border-purple-500/50 focus:outline-none focus:ring-1 focus:ring-purple-500/30 transition-colors duration-300 pr-10"
            />
          </div>
          <motion.button
            className="px-4 py-2 bg-purple-600 border-2 border-purple-500/50 text-white text-[10px] font-bold tracking-[0.15em] font-mono hover:bg-purple-500 hover:border-purple-400 transition-all duration-300 shadow-[0_0_8px_rgba(168,85,247,0.15)]"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ ...SPRING, stiffness: 400, damping: 17 }}
          >
            UPDATE PASSWORD
          </motion.button>
        </div>

        <div className="border-t border-white/5 pt-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Key className="size-3 text-white/40" />
              <span className="text-xs font-mono text-white/60">Active Sessions</span>
            </div>
          </div>
          <div className="space-y-2">
            {sessions.map((session) => (
              <div
                key={session.id}
                className={`flex items-center justify-between rounded-md px-3 py-2 border ${
                  session.current
                    ? "bg-purple-600/5 border-purple-500/10"
                    : "bg-white/5 border-white/5"
                }`}
              >
                <div>
                  <p className="text-xs font-mono text-white/70">{session.device}</p>
                  <p className="text-[10px] font-mono text-white/30">
                    {session.location} · {session.lastActive}
                  </p>
                </div>
                {session.current ? (
                  <span className="text-[10px] font-mono text-purple-400 bg-purple-600/10 px-2 py-0.5 rounded-full border border-purple-500/20">
                    Current
                  </span>
                ) : (
                  <motion.button
                    className="text-white/20 hover:text-red-400 transition-colors duration-300"
                    whileTap={{ scale: 1.2 }}
                    transition={{ ...SPRING, stiffness: 400, damping: 17 }}
                    aria-label="Revoke session"
                  >
                    <Trash2 className="size-3" />
                  </motion.button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-white/5 pt-4">
          <div className="flex items-center gap-3 mb-2">
            <ShieldAlert className="size-4 text-red-400" />
            <span className="text-xs font-mono text-red-400/80">Danger Zone</span>
          </div>
          <p className="text-[10px] font-mono text-white/25 mb-3">
            Once you delete your account, there is no going back.
          </p>
          <motion.button
            className="px-3 py-1.5 bg-red-500/10 border border-red-500/30 text-red-400 text-[10px] font-bold tracking-[0.1em] font-mono hover:bg-red-500/20 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ ...SPRING, stiffness: 400, damping: 17 }}
          >
            DELETE ACCOUNT
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}