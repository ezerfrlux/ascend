"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Camera, Globe, MapPin, Pencil } from "lucide-react";

const SPRING = { type: "spring" as const };
const TWEEN = { type: "tween" as const };

export default function ProfileHeader() {
  const [name, setName] = useState("User");
  const [bio, setBio] = useState("Building better habits one day at a time.");
  const [location, setLocation] = useState("Madrid, Spain");
  const [editing, setEditing] = useState(false);

  return (
    <motion.div
      className="bg-neutral-900/40 border border-white/5 rounded-lg p-6"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...TWEEN, duration: 0.5, ease: "easeOut", delay: 0.1 }}
    >
      <div className="flex items-start gap-5 mb-6">
        <div className="relative shrink-0">
          <div className="h-20 w-20 rounded-full bg-purple-600/20 border border-purple-500/30 flex items-center justify-center">
            <span className="text-xl font-bold text-purple-400 font-mono">U</span>
          </div>
          <motion.button
            className="absolute bottom-0 right-0 h-6 w-6 rounded-full bg-neutral-900 border border-white/10 flex items-center justify-center hover:bg-purple-600/20 hover:border-purple-500/30 transition-colors duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ ...SPRING, stiffness: 400, damping: 17 }}
            aria-label="Change avatar"
          >
            <Camera className="size-3 text-white/50" />
          </motion.button>
        </div>

        <div className="flex-1 min-w-0">
          {editing ? (
            <div className="space-y-3">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-none px-3 py-2 text-sm text-white placeholder:text-white/30 font-mono focus:border-purple-500/50 focus:outline-none focus:ring-1 focus:ring-purple-500/30 transition-colors duration-300"
                placeholder="Display name"
              />
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-none px-3 py-2 text-sm text-white placeholder:text-white/30 font-mono focus:border-purple-500/50 focus:outline-none focus:ring-1 focus:ring-purple-500/30 transition-colors duration-300 resize-none"
                rows={2}
                placeholder="Tell the world about your journey..."
              />
              <div className="flex gap-2">
                <motion.button
                  className="px-4 py-1.5 bg-purple-600 border-2 border-purple-500/50 text-white text-[10px] font-bold tracking-[0.15em] font-mono hover:bg-purple-500 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ ...SPRING, stiffness: 400, damping: 17 }}
                  onClick={() => setEditing(false)}
                >
                  SAVE
                </motion.button>
                <button
                  className="px-4 py-1.5 bg-white/5 border border-white/10 text-white/50 text-[10px] font-bold tracking-[0.15em] font-mono hover:text-white/80 transition-colors duration-300"
                  onClick={() => setEditing(false)}
                >
                  CANCEL
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-lg font-bold text-white font-mono tracking-wider">
                  {name}
                </h2>
                <span className="text-[10px] font-mono text-purple-400 bg-purple-600/10 px-2 py-0.5 rounded-full border border-purple-500/20">
                  EXPLORER
                </span>
              </div>
              <p className="text-xs font-mono text-white/40 mb-2">
                @{name.toLowerCase().replace(/\s+/g, "")}
              </p>
              <p className="text-sm font-mono text-white/50 mb-3">
                {bio}
              </p>
              <div className="flex items-center gap-4 text-xs font-mono text-white/30">
                <span className="flex items-center gap-1">
                  <MapPin className="size-3" />
                  {location}
                </span>
                <span className="flex items-center gap-1">
                  <Globe className="size-3" />
                  Madrid, ES
                </span>
              </div>
              <motion.button
                className="mt-3 flex items-center gap-1.5 text-xs font-mono text-white/40 hover:text-purple-400 transition-colors duration-300"
                onClick={() => setEditing(true)}
                whileHover={{ x: 2 }}
                transition={{ ...SPRING, stiffness: 400, damping: 17 }}
              >
                <Pencil className="size-3" />
                Edit Profile
              </motion.button>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}
