"use client";

import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

interface MainLayoutProps {
  children: React.ReactNode;
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string;
  };
}

import { BackgroundIcons } from "../common/BackgroundIcons";

export function MainLayout({ children, user }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-transparent flex relative overflow-hidden transition-colors duration-300">
      {/* Animated Icon Background */}
      <BackgroundIcons />

      {/* Modern gradient overlay - Neutral blacks to let safari colors pop */}
      <div className="fixed inset-0 z-0 bg-linear-to-t from-white/80 via-white/40 to-white/10 dark:from-black/40 dark:via-black/20 dark:to-transparent transition-colors duration-500" />
      <div className="fixed inset-0 z-0 bg-amber-100/40 dark:bg-amber-900/5 backdrop-blur-[1px]" />

      {/* Decorative accents */}
      <div className="fixed -bottom-24 -left-24 w-96 h-96 bg-amber-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed -top-24 -right-24 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Sidebar needs to be compatible or updated separately. For now, let's keep it but it might look out of place without update. 
          Assuming User wants the MAIN CONTENT area to accept the Glass Forms.
      */}
      <div className="relative z-10 flex w-full h-full">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          user={user}
        />

        <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-white/60 dark:bg-zinc-800/50 backdrop-blur-3xl m-2 rounded-3xl border border-white/60 dark:border-white/10 shadow-xl dark:shadow-2xl transition-all duration-300">
          <Header onMenuClick={() => setSidebarOpen(true)} user={user} />

          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-white/20 scrollbar-track-transparent">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
