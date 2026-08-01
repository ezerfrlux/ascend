"use client";

import { useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import { PanelLeft } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { AppSidebar } from "@/components/app-sidebar";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const [desktopOpen, setDesktopOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleDesktop = useCallback(() => setDesktopOpen((prev) => !prev), []);

  if (!pathname.startsWith("/dashboard")) {
    return <>{children}</>;
  }

  if (isMobile) {
    return (
      <div className="flex min-h-screen w-full">
        <main className="flex flex-1 flex-col">{children}</main>
        <button
          onClick={() => setMobileOpen(true)}
          className="fixed left-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-neutral-950/90 backdrop-blur-md text-white/50 hover:text-white/90 transition-all duration-300 hover:bg-neutral-900/90 focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:outline-hidden"
          aria-label="Open sidebar"
        >
          <PanelLeft className="size-4" />
        </button>
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetContent
            side="left"
            className="w-64 max-w-[85vw] p-0 border-r border-white/5"
          >
            <AppSidebar open={true} />
          </SheetContent>
        </Sheet>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen w-full">
      <motion.button
        onClick={toggleDesktop}
        initial={false}
        animate={{
          left: desktopOpen ? 272 : 16, // 272px = ~17rem, 16px = left-4
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
        className="fixed top-4 z-50 flex h-10 w-10 items-center justify-center text-white/50 hover:text-white focus-visible:outline-hidden"
        aria-label={desktopOpen ? "Collapse sidebar" : "Expand sidebar"}
      >
        <PanelLeft className="size-5" />
      </motion.button>

      <div
        className={cn(
          "transition-all duration-300 ease-in-out overflow-hidden border-r border-white/5 bg-neutral-950",
          desktopOpen ? "w-64" : "w-0 border-r-0",
        )}
      >
        <AppSidebar open={desktopOpen} />
      </div>

      <main className="flex flex-1 flex-col min-w-0 transition-all duration-300 ease-in-out">
        {children}
      </main>
    </div>
  );
}
