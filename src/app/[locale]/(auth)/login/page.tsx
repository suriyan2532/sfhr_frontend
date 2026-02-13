"use client";

import LoginForm from "@/components/auth/LoginForm";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function LoginPage() {
  const t = useTranslations("Auth");

  return (
    <main className="relative min-h-screen w-full overflow-hidden flex items-center justify-center transition-colors duration-300">
      {/* Background Image with Parallax-like scale effect */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="fixed inset-0 z-0 bg-[url('/background.jpg')] bg-cover bg-center"
        style={{ filter: "brightness(0.7) contrast(1.1)" }}
      />

      {/* Modern gradient overlay - Neutral blacks to let safari colors pop */}
      <div className="fixed inset-0 z-0 bg-linear-to-t from-black/70 via-black/30 to-black/10 transition-colors duration-500" />
      <div className="fixed inset-0 z-0 bg-blue-900/10 backdrop-blur-[1px]" />

      {/* Top Controls - Floating Glass Pill */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="absolute top-8 right-8 z-20 flex items-center gap-4 bg-white/10 dark:bg-black/20 backdrop-blur-2xl px-4 py-2 rounded-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.1)] transition-all hover:bg-white/20"
      >
        <ThemeToggle />
        <div className="h-4 w-px bg-white/10" />
        <LanguageSwitcher />
      </motion.div>

      {/* Main Login Card with Advanced Glassmorphism */}
      <motion.div
        initial={{ y: 20, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "circOut" }}
        className="relative z-10 w-full max-w-md px-4"
      >
        <Card className="bg-white/10 dark:bg-zinc-900/40 backdrop-blur-3xl border-white/20 dark:border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] rounded-[2.5rem] overflow-hidden group">
          {/* Subtle Inner Glow */}
          <div className="absolute inset-0 pointer-events-none bg-linear-to-tr from-white/5 to-transparent z-0" />

          <CardHeader className="relative z-10 space-y-4 text-center pt-12 pb-6">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="mx-auto h-16 w-16 rounded-[1.25rem] bg-linear-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-[0_0_30px_rgba(37,99,235,0.4)] border border-white/30"
            >
              <span className="text-white font-black text-3xl tracking-tight drop-shadow-md">
                S
              </span>
            </motion.div>

            <div className="space-y-1.5">
              <CardTitle className="text-4xl font-black tracking-tighter text-white drop-shadow-sm">
                Safari HR
              </CardTitle>
              <CardDescription className="text-blue-100/70 font-bold uppercase tracking-[0.3em] text-[0.65rem]">
                {t("loginTitle")}
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="relative z-10 px-10 pb-12">
            <LoginForm />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-8 text-center"
            >
              <p className="text-[10px] text-white/30 font-medium uppercase tracking-[0.25em]">
                {t("authorizedOnly")}
              </p>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Decorative accent */}
      <div className="fixed -bottom-24 -left-24 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed -top-24 -right-24 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
    </main>
  );
}
