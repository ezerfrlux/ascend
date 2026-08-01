"use client";

import { LayoutGrid, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutGrid },
  { href: "/dashboard/profile", label: "Profile", icon: User },
];

interface AppSidebarProps {
  open: boolean;
}

export function AppSidebar({ open }: AppSidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "flex h-full flex-col border-r border-white/5 bg-neutral-950/95 backdrop-blur-md transition-all duration-300 ease-in-out overflow-hidden",
        open ? "w-64" : "w-0"
      )}
    >
      <div className="flex items-center justify-center py-4">
        <span
          className={cn(
            "font-bold text-white tracking-[0.35em] font-mono transition-opacity duration-200",
            open ? "opacity-100" : "opacity-0 w-0"
          )}
        >
          ASCEND
        </span>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-3 py-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium ring-sidebar-ring outline-hidden transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70"
              )}
            >
              <Icon className="size-4 shrink-0" />
              <span
                className={cn(
                  "truncate transition-opacity duration-200",
                  open ? "opacity-100" : "opacity-0 w-0"
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/5 px-3 py-2">
        <Link
          href="/dashboard/profile"
          className={cn(
            "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ring-sidebar-ring outline-hidden transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50",
            open ? "opacity-100" : "opacity-0 w-0"
          )}
        >
          <div className="h-8 w-8 rounded-full bg-purple-600/20 border border-purple-500/30 flex items-center justify-center shrink-0">
            <span className="text-xs font-mono text-purple-400">U</span>
          </div>
          <div className="truncate">
            <p className="text-xs font-mono text-white/70 truncate">User</p>
            <p className="text-[10px] font-mono text-white/30 truncate">
              user@example.com
            </p>
          </div>
        </Link>
      </div>
    </aside>
  );
}