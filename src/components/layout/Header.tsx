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
    <header className="sticky top-0 z-40 border-b border-border h-16 bg-background/80 backdrop-blur-md transition-colors duration-300">
      <div className="flex items-center justify-between h-full px-4 sm:px-6 lg:px-8">
        {/* Left: Mobile Menu & Search */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={onMenuClick}
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Open sidebar</span>
          </Button>

          <div className="hidden sm:flex items-center group relative">
            <Search className="absolute left-3 h-4 w-4 text-muted-foreground group-focus-within:text-foreground transition-colors" />
            <Input
              className="w-64 pl-9 h-9 bg-secondary border-none focus-visible:ring-1"
              placeholder="Search..."
              type="search"
            />
          </div>
        </div>

        {/* Right: Notifications & Profile */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 bg-white/40 dark:bg-white/10 backdrop-blur-2xl p-1.5 rounded-full border border-white/20 shadow-sm transition-all hover:bg-white/60 dark:hover:bg-white/20">
            <ThemeToggle />
            <div className="h-4 w-px bg-black/10 dark:bg-white/10 mx-1" />
            <LanguageSwitcher />
          </div>

          <Button variant="ghost" size="icon" className="rounded-full relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-destructive border-[1.5px] border-background"></span>
            </span>
            <span className="sr-only">Notifications</span>
          </Button>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-10 gap-2 px-2 hover:bg-secondary rounded-full transition-all"
              >
                <Avatar className="h-8 w-8 border-2 border-primary/20">
                  <AvatarImage src={user?.image || ""} alt={user?.name || ""} />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {user?.name?.charAt(0) || <User className="h-4 w-4" />}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start hidden sm:block">
                  <span className="text-sm font-bold leading-none">
                    {user?.name || "User"}
                  </span>
                  <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                    {user?.role || "Employee"}
                  </span>
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 mt-1 rounded-xl shadow-xl border-border/50"
            >
              <DropdownMenuLabel className="font-bold">
                My Account
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="gap-2 cursor-pointer font-medium h-10">
                <UserCircle className="h-4 w-4" /> Your Profile
              </DropdownMenuItem>
              <DropdownMenuItem
                className="gap-2 cursor-pointer font-medium h-10"
                asChild
              >
                <Link href="/settings/master">
                  <Settings className="h-4 w-4" /> Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="gap-2 cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10 font-bold h-10"
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
