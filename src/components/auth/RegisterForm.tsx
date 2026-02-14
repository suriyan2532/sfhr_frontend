"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerSchema,
  RegisterFormValues,
} from "@/lib/validators/register-schema";
import { useRouter } from "@/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, AlertCircle, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function RegisterForm() {
  const t = useTranslations("Auth");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema) as never,
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      first_name: "",
      last_name: "",
      nickname: "",
      phone: "",
      department: "",
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    setErrorMessage(undefined);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...data,
            department: parseInt(data.department), // Validate this matches backend expectation
          }),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.Message || t("registrationFailed"));
      }

      toast.success(t("registrationSuccess"), {
        description: t("waitForApproval"),
        duration: 5000,
      });

      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error) {
      console.error("Registration error:", error);
      const message =
        error instanceof Error ? error.message : t("registrationFailed");
      setErrorMessage(message);
      toast.error(t("registrationFailed"));
    } finally {
      setIsLoading(false);
    }
  };

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Username */}
        <div className="space-y-1">
          <Label htmlFor="username">{t("username")}</Label>
          <Input
            id="username"
            {...register("username")}
            placeholder="username"
          />
          {errors.username && (
            <p className="text-xs text-red-500">
              {t(errors.username.message as never)}
            </p>
          )}
        </div>

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

        {/* Password */}
        <div className="space-y-1">
          <Label htmlFor="password">{t("password")}</Label>
          <Input
            id="password"
            type="password"
            {...register("password")}
            placeholder="******"
          />
          {errors.password && (
            <p className="text-xs text-red-500">
              {t(errors.password.message as never)}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-1">
          <Label htmlFor="confirmPassword">{t("confirmPassword")}</Label>
          <Input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword")}
            placeholder="******"
          />
          {errors.confirmPassword && (
            <p className="text-xs text-red-500">
              {t(errors.confirmPassword.message as never)}
            </p>
          )}
        </div>

        {/* First Name */}
        <div className="space-y-1">
          <Label htmlFor="first_name">{t("firstName")}</Label>
          <Input
            id="first_name"
            {...register("first_name")}
            placeholder="Somsak"
          />
          {errors.first_name && (
            <p className="text-xs text-red-500">
              {t(errors.first_name.message as never)}
            </p>
          )}
        </div>

        {/* Last Name */}
        <div className="space-y-1">
          <Label htmlFor="last_name">{t("lastName")}</Label>
          <Input
            id="last_name"
            {...register("last_name")}
            placeholder="Jaidee"
          />
          {errors.last_name && (
            <p className="text-xs text-red-500">
              {t(errors.last_name.message as never)}
            </p>
          )}
        </div>

        {/* Nickname */}
        <div className="space-y-1">
          <Label htmlFor="nickname">{t("nickname")}</Label>
          <Input id="nickname" {...register("nickname")} placeholder="Sak" />
        </div>

        {/* Phone */}
        <div className="space-y-1">
          <Label htmlFor="phone">{t("phone")}</Label>
          <Input id="phone" {...register("phone")} placeholder="0812345678" />
          {errors.phone && (
            <p className="text-xs text-red-500">
              {t(errors.phone.message as never)}
            </p>
          )}
        </div>

        {/* Department - Hardcoded for now, ideal to fetch from API */}
        <div className="space-y-1 col-span-1 md:col-span-2">
          <Label htmlFor="department">{t("department")}</Label>
          <div className="relative">
            <select
              id="department"
              {...register("department")}
              className={cn(
                "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                errors.department && "border-red-500 focus:ring-red-500",
              )}
            >
              <option value="" disabled selected>
                {t("selectDepartment")}
              </option>
              <option value="1">IT</option>
              <option value="2">HR</option>
              <option value="3">Sales</option>
              <option value="4">Marketing</option>
            </select>
          </div>
          {errors.department && (
            <p className="text-xs text-red-500">
              {t(errors.department.message as never)}
            </p>
          )}
        </div>
      </div>

      <Button type="submit" className="w-full mt-4" disabled={isLoading}>
        {isLoading ? (
          <Loader2 className="animate-spin h-5 w-5" />
        ) : (
          t("register")
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
