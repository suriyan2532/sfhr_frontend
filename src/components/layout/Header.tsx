"use client";

import {
  Bell,
  Search,
  Menu,
  ChevronDown,
  User,
  LogOut,
  Settings,
  UserCircle,
} from "lucide-react";
import { signOut } from "next-auth/react";
import LanguageSwitcher from "../common/LanguageSwitcher";
import { ThemeToggle } from "../common/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "@/navigation";

interface HeaderProps {
  onMenuClick: () => void;
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string;
  };
}

export function Header({ onMenuClick, user }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-white/70 dark:bg-black/70 backdrop-blur-xl transition-all duration-300 shadow-sm">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Mobile Menu & Search */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-muted-foreground hover:text-foreground"
            onClick={onMenuClick}
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Open sidebar</span>
          </Button>

          <div className="hidden sm:flex items-center group relative">
            <Search className="absolute left-3 h-4 w-4 text-muted-foreground group-focus-within:text-amber-500 transition-colors duration-300" />
            <Input
              className="w-64 pl-10 h-10 rounded-full bg-secondary/50 border-transparent focus:border-amber-500/50 focus:bg-background focus:ring-0 transition-all duration-300 shadow-inner"
              placeholder="Search..."
              type="search"
            />
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Theme & Language Switcher Group */}
          <div className="hidden md:flex items-center gap-2 bg-secondary/30 backdrop-blur-md p-1.5 rounded-full border border-white/10 shadow-sm">
            <ThemeToggle />
            <div className="h-4 w-px bg-border mx-1" />
            <LanguageSwitcher />
          </div>

          {/* Notification */}
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full relative text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-2.5 right-2.5 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500 border border-background"></span>
            </span>
            <span className="sr-only">Notifications</span>
          </Button>

          {/* Divider */}
          <div className="h-8 w-px bg-border/50 hidden md:block" />

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-auto py-1 pl-1 pr-3 rounded-full hover:bg-secondary/50 gap-3 border border-transparent hover:border-border/50 transition-all duration-300 group"
              >
                <Avatar className="h-9 w-9 border-2 border-white dark:border-zinc-800 shadow-sm transition-transform group-hover:scale-105">
                  <AvatarImage src={user?.image || ""} alt={user?.name || ""} />
                  <AvatarFallback className="bg-linear-to-br from-amber-500 to-orange-600 text-white font-bold">
                    {user?.name?.charAt(0) || <User className="h-4 w-4" />}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden sm:flex flex-col items-start text-left">
                  <span className="text-sm font-bold leading-none text-foreground group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    {user?.name || "User"}
                  </span>
                  <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                    {user?.role || "Employee"}
                  </span>
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 mt-2 rounded-2xl shadow-xl border-border/50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl p-2"
              forceMount
            >
              <DropdownMenuLabel className="font-bold px-3 py-2 text-xs uppercase tracking-wider text-muted-foreground">
                My Account
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-border/50 my-1" />
              <DropdownMenuItem className="gap-2 cursor-pointer font-medium h-10 rounded-lg focus:bg-amber-500/10 focus:text-amber-600 dark:focus:text-amber-400">
                <UserCircle className="h-4 w-4" /> Your Profile
              </DropdownMenuItem>
              <DropdownMenuItem
                className="gap-2 cursor-pointer font-medium h-10 rounded-lg focus:bg-amber-500/10 focus:text-amber-600 dark:focus:text-amber-400"
                asChild
              >
                <Link href="/settings/master">
                  <Settings className="h-4 w-4" /> Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-border/50 my-1" />
              <DropdownMenuItem
                className="gap-2 cursor-pointer text-red-500 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-900/10 font-bold h-10 rounded-lg"
                onClick={() => signOut({ callbackUrl: "/login" })}
              >
                <LogOut className="h-4 w-4" /> Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
