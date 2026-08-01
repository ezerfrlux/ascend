"use client";

import { LayoutGrid, User, PanelLeftClose, PanelLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutGrid },
  { href: "/profile", label: "Profile", icon: User },
];

interface AppSidebarProps {
  open: boolean;
  toggle: () => void;
}

export function AppSidebar({ open, toggle }: AppSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      <aside
        className={cn(
          "flex h-full flex-col border-r border-white/5 bg-neutral-950/95 backdrop-blur-md transition-all duration-300 ease-in-out",
          open ? "w-64" : "w-0 overflow-hidden"
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

        <div className="flex flex-col gap-1 border-t border-white/5 px-3 py-2">
          <Link
            href="/profile"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ring-sidebar-ring outline-hidden transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50"
          >
            <div className="h-8 w-8 rounded-full bg-purple-600/20 border border-purple-500/30 flex items-center justify-center shrink-0">
              <span className="text-xs font-mono text-purple-400">U</span>
            </div>
            <span
              className={cn(
                "truncate transition-opacity duration-200",
                open ? "opacity-100" : "opacity-0 w-0"
              )}
            >
              <p className="text-xs font-mono text-white/70 truncate">User</p>
              <p className="text-[10px] font-mono text-white/30 truncate">
                user@example.com
              </p>
            </span>
          </Link>

          <button
            onClick={toggle}
            className="flex items-center justify-center gap-2 border-t border-white/5 px-3 py-2 text-xs font-mono text-white/40 hover:text-white/80 transition-colors duration-300"
            aria-label="Toggle sidebar"
          >
            {open ? (
              <>
                <PanelLeftClose className="size-4" />
                <span>Collapse</span>
              </>
            ) : (
              <>
                <PanelLeft className="size-4" />
                <span>Expand</span>
              </>
            )}
          </button>
        </div>
      </aside>

      {!open && (
        <button
          onClick={toggle}
          className="fixed left-4 top-1/2 z-50 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-neutral-950/90 backdrop-blur-md text-white/50 hover:text-white/90 transition-all duration-300 hover:bg-neutral-900/90 focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:outline-hidden"
          aria-label="Expand sidebar"
        >
          <PanelLeft className="size-4" />
        </button>
      )}
    </>
  );
}