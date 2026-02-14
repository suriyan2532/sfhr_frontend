"use client";

import AuthCard from "@/components/auth/AuthCard";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import { useTranslations } from "next-intl";

export default function ForgotPasswordPage() {
  const t = useTranslations("Auth");

  return (
    <AuthCard
      title={t("forgotPassword")}
      subtitle={t("forgotPasswordSubtitle")}
    >
      <ForgotPasswordForm />
    </AuthCard>
  );
}
