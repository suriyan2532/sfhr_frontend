"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, AlertCircle, ArrowLeft, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Link, useRouter } from "@/navigation";

const forgotPasswordSchema = z.object({
  email: z.string().email("invalidEmail"),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordForm() {
  const t = useTranslations("Auth");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema) as never,
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setIsLoading(true);
    setErrorMessage(undefined);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/auth/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.Message || t("requestFailed"));
      }

      setSuccess(true);
      toast.success(t("requestSent"), {
        description: t("checkEmail"),
        duration: 5000,
      });
    } catch (error) {
      console.error("Forgot password error:", error);
      const message =
        error instanceof Error ? error.message : t("requestFailed");
      setErrorMessage(message);
      toast.error(t("requestFailed"));
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="h-16 w-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400"
        >
          <Mail className="h-8 w-8" />
        </motion.div>
        <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
          {t("checkYourEmail")}
        </h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-xs">
          {t("emailSentDescription")}
        </p>
        <Button asChild className="mt-4 w-full" variant="outline">
          <Link href="/login">{t("backToLogin")}</Link>
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <AnimatePresence>
        {errorMessage && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-red-500 shrink-0" />
              <p className="text-xs text-red-500 font-bold">{errorMessage}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-4">
        <p className="text-sm text-zinc-500 dark:text-zinc-400 text-center mb-4">
          {t("forgotPasswordDescription")}
        </p>

        {/* Email */}
        <div className="space-y-1">
          <Label htmlFor="email">{t("email")}</Label>
          <Input
            id="email"
            {...register("email")}
            placeholder="email@example.com"
          />
          {errors.email && (
            <p className="text-xs text-red-500">
              {t(errors.email.message as never)}
            </p>
          )}
        </div>
      </div>

      <Button type="submit" className="w-full mt-4" disabled={isLoading}>
        {isLoading ? (
          <Loader2 className="animate-spin h-5 w-5" />
        ) : (
          t("sendResetLink")
        )}
      </Button>

      <div className="text-center mt-4">
        <Link
          href="/login"
          className="text-sm text-zinc-500 hover:text-zinc-800 transition-colors flex items-center justify-center gap-1"
        >
          <ArrowLeft className="h-4 w-4" /> {t("backToLogin")}
        </Link>
      </div>
    </form>
  );
}
