"use client";

import { useState } from "react";
import { authenticate } from "@/lib/actions/auth-actions";
import { Link, useRouter } from "@/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  AlertCircle,
  Loader2,
  Bird,
  Fish,
  Turtle,
  PawPrint,
  Leaf,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormValues } from "@/lib/validators/login-schema";
import { toast } from "sonner";

import { motion } from "framer-motion";

export default function LoginForm() {
  const t = useTranslations("Auth");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema) as never,
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setErrorMessage(undefined);

    try {
      const formData = new FormData();
      formData.append("username", data.username);
      formData.append("password", data.password);

      const result = await authenticate(undefined, formData);

      if (result) {
        setErrorMessage(t("invalidCredentials"));
        toast.error(t("loginFailed"), {
          description: t("invalidCredentials"),
        });
      } else {
        router.refresh();
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage(t("loginFailed"));
      toast.error(t("loginFailed"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-5">
        {/* Auth Error Banner */}
        <AnimatePresence>
          {errorMessage && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div
                className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center gap-3"
                aria-live="polite"
              >
                <AlertCircle className="h-5 w-5 text-red-500 shrink-0" />
                <p className="text-sm text-red-500 font-bold">{errorMessage}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-2">
          <Label
            htmlFor="username"
            className="text-xs font-bold ml-1 text-zinc-700 dark:text-white/70 uppercase tracking-widest pl-1"
          >
            {t("username")}
          </Label>
          <Input
            id="username"
            {...register("username")}
            type="text"
            placeholder="admin"
            className={cn(
              "h-14 px-5 bg-black/5 dark:bg-white/10 border-black/10 dark:border-white/20 text-zinc-900 dark:text-white placeholder:text-zinc-500 dark:placeholder:text-white/40 rounded-2xl transition-all duration-300 focus:bg-black/10 dark:focus:bg-white/20 focus:border-amber-500/50 dark:focus:border-white/40 focus:ring-4 focus:ring-amber-500/20",
              errors.username &&
                "border-red-500/50 bg-red-500/5 focus:ring-red-500/20",
            )}
          />
          {errors.username && (
            <motion.p
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="text-[10px] text-red-400 font-bold ml-2 mt-1 uppercase tracking-wider"
            >
              {t(errors.username.message as never)}
            </motion.p>
          )}
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="password"
            className="text-xs font-bold ml-1 text-zinc-700 dark:text-white/70 uppercase tracking-widest pl-1"
          >
            {t("password")}
          </Label>
          <Input
            id="password"
            {...register("password")}
            type="password"
            placeholder="••••••"
            className={cn(
              "h-14 px-5 bg-black/5 dark:bg-white/10 border-black/10 dark:border-white/20 text-zinc-900 dark:text-white placeholder:text-zinc-500 dark:placeholder:text-white/40 rounded-2xl transition-all duration-300 focus:bg-black/10 dark:focus:bg-white/20 focus:border-amber-500/50 dark:focus:border-white/40 focus:ring-4 focus:ring-amber-500/20",
              errors.password &&
                "border-red-500/50 bg-red-500/10 focus:ring-red-500/20",
            )}
          />
          {errors.password && (
            <motion.p
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="text-[10px] text-red-400 font-bold ml-2 mt-1 uppercase tracking-wider"
            >
              {t(errors.password.message as never)}
            </motion.p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between px-1 text-zinc-600 dark:text-white/60">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="remember-me"
            name="remember-me"
            className="border-zinc-400 dark:border-white/20 data-[state=checked]:bg-amber-600 data-[state=checked]:border-amber-600"
          />
          <Label
            htmlFor="remember-me"
            className="text-xs font-medium leading-none cursor-pointer hover:text-black dark:hover:text-white transition-colors"
          >
            {t("rememberMe")}
          </Label>
        </div>

        <div className="text-xs">
          <Link
            href="/forgot-password"
            className="font-bold text-amber-400 hover:text-amber-300 transition-colors"
          >
            {t("forgotPassword")}
          </Link>
        </div>
      </div>

      <div className="space-y-4 pt-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          className="relative"
        >
          <Button
            type="submit"
            className="w-full h-14 text-base font-black bg-linear-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white border-none rounded-2xl transition-all shadow-[0_10px_40px_-10px_rgba(180,83,9,0.5)] active:shadow-none relative overflow-hidden"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="h-6 w-6 animate-spin" />
            ) : (
              <>
                <span className="relative z-10">{t("signIn")}</span>

                {/* Safari Background-Style Floating Animation */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }} // Fast fade in
                      className="absolute inset-0 overflow-hidden pointer-events-none z-0"
                    >
                      {[Bird, Fish, Turtle, PawPrint, Leaf].map(
                        (Icon, index) => {
                          // Spread the 5 icons across the area
                          const randomX = [10, 85, 20, 75, 45][index];
                          const randomY = [15, 20, 75, 70, 45][index];
                          const duration = 4 + (index % 3);
                          const delay = -(index * 0.5);
                          const initialRotate = (index * 72) % 360; // 360 / 5 = 72

                          return (
                            <motion.div
                              key={index}
                              initial={{
                                opacity: 0,
                                scale: 0.5,
                                x: 0,
                                y: 0,
                                rotate: initialRotate,
                              }}
                              animate={{
                                opacity: [0.4, 0.9, 0.4],
                                scale: [0.8, 1.1, 0.9],
                                x: [0, index % 2 === 0 ? 15 : -15, 0],
                                y: [0, index % 3 === 0 ? -15 : 15, 0],
                                rotate: [
                                  initialRotate,
                                  initialRotate + 20,
                                  initialRotate - 10,
                                  initialRotate,
                                ],
                              }}
                              exit={{ opacity: 0, scale: 0.5 }}
                              transition={{
                                duration: duration,
                                ease: "easeInOut",
                                repeat: Infinity,
                                delay: delay,
                              }}
                              className="absolute"
                              style={{
                                left: `${randomX}%`,
                                top: `${randomY}%`,
                              }}
                            >
                              <Icon className="text-white h-8 w-8 drop-shadow-sm" />
                            </motion.div>
                          );
                        },
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            )}
          </Button>
        </motion.div>

        <Button
          asChild
          variant="ghost"
          className="w-full h-12 text-zinc-500 dark:text-white/40 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 font-bold text-xs uppercase tracking-widest rounded-2xl transition-all"
        >
          <Link href="/dashboard">{t("skipToDashboard")}</Link>
        </Button>
      </div>
    </form>
  );
}

// Helper to handle class merging if not imported
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { AnimatePresence } from "framer-motion";
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
