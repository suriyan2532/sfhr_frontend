"use client";

import Image from "next/image";
import LoginForm from "@/components/auth/LoginForm";
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

export default function LoginPage() {
  const t = useTranslations("Auth");

  return (
    <main className="relative min-h-screen w-full overflow-hidden flex items-center justify-center transition-colors duration-300">
      {/* Animated Icon Background */}
      <BackgroundIcons />

      {/* Modern gradient overlay - Neutral blacks to let safari colors pop */}
      {/* Modern gradient overlay - Neutral blacks to let safari colors pop */}
      <div className="fixed inset-0 z-0 bg-linear-to-t from-white/80 via-white/40 to-white/10 dark:from-black/40 dark:via-black/20 dark:to-transparent transition-colors duration-500" />
      <div className="fixed inset-0 z-0 bg-green-100/40 dark:bg-green-900/5 backdrop-blur-[1px]" />

      {/* Top Controls - Floating Glass Pill */}
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

      {/* Main Login Card with Advanced Glassmorphism */}
      <motion.div
        initial={{ y: 20, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "circOut" }}
        className="relative z-10 w-full max-w-md px-4"
      >
        <Card className="bg-white/60 dark:bg-zinc-800/50 backdrop-blur-3xl border-white/60 dark:border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] rounded-[2.5rem] overflow-hidden group">
          {/* Subtle Inner Glow */}
          <div className="absolute inset-0 pointer-events-none bg-linear-to-tr from-white/5 to-transparent z-0" />

          <CardHeader className="relative z-10 space-y-4 text-center pt-8 pb-4 md:pt-12 md:pb-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="mx-auto h-20 w-20 md:h-24 md:w-24 relative rounded-full overflow-hidden border-4 border-green-500 shadow-[0_0_30px_rgba(34,197,94,0.4)] bg-white"
            >
              <Image
                src="/safari_world_hr_logo.png"
                alt="Safari World HR Logo"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 96px, 96px"
                priority
              />
            </motion.div>

            <div className="space-y-1.5">
              <CardTitle className="text-2xl md:text-3xl font-black tracking-tight text-zinc-900 dark:text-white drop-shadow-md">
                Safari HR
              </CardTitle>
              <CardDescription className="text-zinc-700 dark:text-green-100/70 font-bold uppercase tracking-[0.3em] text-[0.65rem]">
                {t("loginTitle")}
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="relative z-10 px-6 pb-8 md:px-10 md:pb-12">
            <LoginForm />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-8 text-center"
            >
              <p className="text-[10px] text-zinc-400 dark:text-white/30 font-medium uppercase tracking-[0.25em]">
                {t("authorizedOnly")}
              </p>
            </motion.div>
          </CardContent>
        </Card>

        {/* Isolated Cute Cartoon Macaw - Top Right */}
        <motion.div
          initial={{ x: 50, y: -50, opacity: 0, rotate: -10 }}
          animate={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
          transition={{ delay: 0.8, duration: 1.2, ease: "easeOut" }}
          className="absolute -right-20 -top-16 z-20 w-48 h-48 md:w-64 md:h-64 pointer-events-none drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)] hidden md:block"
        >
          <Image
            src="/macaw_cartoon.png"
            alt="Macaw"
            width={256}
            height={256}
            className="w-full h-full object-contain"
            priority
          />
        </motion.div>
      </motion.div>

      {/* Decorative accent */}
      <div className="fixed -bottom-24 -left-24 w-96 h-96 bg-green-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed -top-24 -right-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
    </main>
  );
}
