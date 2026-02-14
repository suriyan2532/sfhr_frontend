"use client";

import Image from "next/image";
import RegisterForm from "@/components/auth/RegisterForm";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { BackgroundIcons } from "@/components/common/BackgroundIcons";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function RegisterPage() {
  const t = useTranslations("Auth");

  return (
    <main className="relative min-h-screen w-full overflow-hidden flex items-center justify-center transition-colors duration-300">
      {/* Animated Icon Background */}
      <BackgroundIcons />

      {/* Modern gradient overlay */}
      <div className="fixed inset-0 z-0 bg-linear-to-t from-white/80 via-white/40 to-white/10 dark:from-black/40 dark:via-black/20 dark:to-transparent transition-colors duration-500" />
      <div className="fixed inset-0 z-0 bg-amber-100/40 dark:bg-amber-900/5 backdrop-blur-[1px]" />

      {/* Top Controls */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="absolute top-8 right-8 z-20 flex items-center gap-2 bg-white/40 dark:bg-white/10 backdrop-blur-2xl p-1.5 rounded-full border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.1)] transition-all hover:bg-white/60 dark:hover:bg-white/20"
      >
        <ThemeToggle />
        <div className="h-4 w-px bg-black/10 dark:bg-white/10 mx-1" />
        <LanguageSwitcher />
      </motion.div>

      {/* Main Register Card */}
      <motion.div
        initial={{ y: 20, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "circOut" }}
        className="relative z-10 w-full max-w-lg px-4 my-8"
      >
        <Card className="bg-white/60 dark:bg-zinc-800/50 backdrop-blur-3xl border-white/60 dark:border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] rounded-[2.5rem] overflow-hidden group">
          <div className="absolute inset-0 pointer-events-none bg-linear-to-tr from-white/5 to-transparent z-0" />

          <CardHeader className="relative z-10 space-y-4 text-center pt-8 pb-4 md:pt-12 md:pb-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="mx-auto h-16 w-16 md:h-20 md:w-20 relative rounded-full overflow-hidden border-4 border-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.4)] bg-white"
            >
              <Image
                src="/safari_world_hr_logo.png"
                alt="Safari World HR Logo"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 64px, 80px"
                priority
              />
            </motion.div>

            <div className="space-y-1.5">
              <CardTitle className="text-2xl md:text-3xl font-black tracking-tight text-zinc-900 dark:text-white drop-shadow-md">
                {t("register")}
              </CardTitle>
              <CardDescription className="text-zinc-700 dark:text-amber-100/70 font-bold uppercase tracking-[0.3em] text-[0.65rem]">
                {t("loginSubtitle")}
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="relative z-10 px-6 pb-8 md:px-10 md:pb-12">
            <RegisterForm />
          </CardContent>
        </Card>
      </motion.div>
    </main>
  );
}
