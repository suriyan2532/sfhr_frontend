'use client';

import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface MainLayoutProps {
  children: React.ReactNode;
  user: any; // Type this properly later
}

export function MainLayout({ children, user }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#1e1e1e] flex relative overflow-hidden transition-colors duration-300">
       {/* Global Background Image - Dark mode only or adjusted opacity */}
       <div 
            className="fixed inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?ixlib=rb-1.2.1&auto=format&fit=crop&w=2076&q=80')] bg-cover bg-center opacity-10 dark:opacity-100 transition-opacity duration-300"
            style={{ filter: 'brightness(0.4) blur(5px)' }}
        />
        {/* Helper overlay for readability */}
        <div className="fixed inset-0 z-0 bg-white/40 dark:bg-black/40 pointer-events-none" />

      {/* Sidebar needs to be compatible or updated separately. For now, let's keep it but it might look out of place without update. 
          Assuming User wants the MAIN CONTENT area to accept the Glass Forms.
      */}
      <div className="relative z-10 flex w-full h-full"> 
        <Sidebar 
            isOpen={sidebarOpen} 
            onClose={() => setSidebarOpen(false)} 
        />

        <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-white/60 dark:bg-white/5 backdrop-blur-sm m-2 rounded-3xl border border-gray-200 dark:border-white/10 shadow-xl dark:shadow-2xl transition-all duration-300">
            <Header 
            onMenuClick={() => setSidebarOpen(true)} 
            user={user}
            />
            
            <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-white/20 scrollbar-track-transparent">
            {children}
            </main>
        </div>
      </div>
    </div>
  );
}
