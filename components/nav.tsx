"use client";

import { useRouter } from "next/navigation";

export default function Nav() {
  const router = useRouter();

  return (
    <nav className="relative z-50 flex h-14 items-center justify-between border-b border-white/5 bg-neutral-950/80 px-6 backdrop-blur-md">
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => router.push("/")}
      >
        <span className="text-lg font-bold text-white tracking-[0.35em] font-mono">
          ASCEND
        </span>
      </div>

      <div className="flex items-center gap-6">
        <a
          href="/dashboard"
          className="text-xs font-mono tracking-wider text-white/50 hover:text-white transition-colors duration-300"
        >
          DASHBOARD
        </a>
        <a
          href="#"
          className="text-xs font-mono tracking-wider text-white/50 hover:text-white transition-colors duration-300"
        >
          HABITS
        </a>
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="h-7 w-7 rounded-full bg-purple-600/20 border border-purple-500/30 flex items-center justify-center">
            <span className="text-xs font-mono text-purple-400">U</span>
          </div>
        </div>
      </div>
    </nav>
  );
}