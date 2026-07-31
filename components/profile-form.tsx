"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const SPRING = { type: "spring" as const };
const TWEEN = { type: "tween" as const };

export default function ProfileForm({ onSave }: { onSave: (data: { name: string; email: string }) => void }) {
  const [name, setName] = useState("User");
  const [email, setEmail] = useState("user@example.com");
  const [saved, setSaved] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave({ name, email });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <motion.form
      className="bg-neutral-900/40 border border-white/5 rounded-lg p-6 space-y-5"
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...TWEEN, duration: 0.5, ease: "easeOut", delay: 0.2 }}
    >
      <h3 className="text-sm font-bold text-white tracking-[0.2em] font-mono uppercase">
        Edit Profile
      </h3>

      <div className="space-y-2">
        <label className="block text-[10px] font-medium text-white/40 font-mono tracking-wider uppercase">
          Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-none px-4 py-2.5 text-sm text-white placeholder:text-white/30 font-mono focus:border-purple-500/50 focus:outline-none focus:ring-1 focus:ring-purple-500/30 transition-colors duration-300"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-[10px] font-medium text-white/40 font-mono tracking-wider uppercase">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-none px-4 py-2.5 text-sm text-white placeholder:text-white/30 font-mono focus:border-purple-500/50 focus:outline-none focus:ring-1 focus:ring-purple-500/30 transition-colors duration-300"
        />
      </div>

      <div className="flex items-center gap-3">
        <motion.button
          type="submit"
          className="px-5 py-2.5 bg-purple-600 border-2 border-purple-500/50 text-white text-xs font-bold tracking-[0.2em] font-mono hover:bg-purple-500 hover:border-purple-400 transition-all duration-300 shadow-[0_0_10px_rgba(168,85,247,0.2)] hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ ...SPRING, stiffness: 400, damping: 17 }}
        >
          SAVE
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
    </motion.form>
  );
}