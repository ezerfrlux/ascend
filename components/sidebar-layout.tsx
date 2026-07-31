"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { usePathname } from "next/navigation";

export default function SidebarLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/") {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen w-full">
      <AppSidebar />
      <main className="flex flex-1 flex-col">
        {children}
      </main>
    </div>
  );
}
