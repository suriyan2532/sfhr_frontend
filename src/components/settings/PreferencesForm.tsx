"use client";

import { useTranslations } from "next-intl";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export function PreferencesForm() {
  const t = useTranslations("Settings");

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("preferences")}</CardTitle>
        <CardDescription>{t("preferencesDesc")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-base">{t("theme")}</Label>
            <p className="text-sm text-muted-foreground">{t("themeDesc")}</p>
          </div>
          <ThemeToggle />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-base">{t("language")}</Label>
            <p className="text-sm text-muted-foreground">{t("languageDesc")}</p>
          </div>
          <LanguageSwitcher />
        </div>
      </CardContent>
    </Card>
  );
}
