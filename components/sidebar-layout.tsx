"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { usePathname } from "next/navigation";
import { useState, useCallback } from "react";

export default function SidebarLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(true);
  const toggle = useCallback(() => setOpen((prev) => !prev), []);

  if (pathname === "/") {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen w-full">
      <AppSidebar open={open} toggle={toggle} />
      <main className={`flex flex-1 flex-col transition-all duration-300 ease-in-out ${open ? "" : "pl-12"}`}>
        {children}
      </main>
    </div>
  );
}