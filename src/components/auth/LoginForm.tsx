"use client";

import { useActionState } from "react";
import { authenticate } from "@/lib/actions/auth-actions";
import { Link } from "@/navigation";
import { useFormStatus } from "react-dom";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertCircle, Loader2 } from "lucide-react";

function LoginButton() {
  const { pending } = useFormStatus();
  const t = useTranslations("Auth");

  return (
    <Button
      type="submit"
      className="w-full h-11 text-base font-bold transition-all hover:scale-[1.02] active:scale-[0.98]"
      disabled={pending}
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {t("signingIn")}
        </>
      ) : (
        t("signIn")
      )}
    </Button>
  );
}

export default function LoginForm() {
  const [errorMessage, dispatch] = useActionState(authenticate, undefined);
  const t = useTranslations("Auth");

  return (
    <form action={dispatch} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username" className="text-sm font-bold ml-1">
            {t("username")}
          </Label>
          <Input
            id="username"
            name="username"
            type="text"
            required
            placeholder="admin"
            className="h-11 px-4"
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="password"
            title={t("password")}
            className="text-sm font-bold ml-1"
          >
            {t("password")}
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            minLength={6}
            placeholder="••••••"
            className="h-11 px-4"
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Checkbox id="remember-me" name="remember-me" />
          <Label
            htmlFor="remember-me"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {t("rememberMe")}
          </Label>
        </div>

        <div className="text-sm">
          <Link
            href="/forgot-password"
            className="font-bold text-primary hover:underline transition-all"
          >
            {t("forgotPassword")}
          </Link>
        </div>
      </div>

      <div className="space-y-3 pt-2">
        <LoginButton />
        <Button
          asChild
          variant="ghost"
          className="w-full h-11 text-muted-foreground hover:text-foreground font-medium"
        >
          <Link href="/dashboard">{t("skipToDashboard")}</Link>
        </Button>
      </div>

      {errorMessage && (
        <div
          className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 flex items-center gap-2"
          aria-live="polite"
          aria-atomic="true"
        >
          <AlertCircle className="h-4 w-4 text-destructive" />
          <p className="text-sm text-destructive font-medium">{errorMessage}</p>
        </div>
      )}
    </form>
  );
}
