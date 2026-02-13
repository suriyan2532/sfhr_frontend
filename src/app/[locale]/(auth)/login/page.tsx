import LoginForm from "@/components/auth/LoginForm";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { getTranslations } from "next-intl/server";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default async function LoginPage() {
  const t = await getTranslations("Auth");

  return (
    <main className="relative min-h-screen w-full overflow-hidden flex items-center justify-center transition-colors duration-300">
      {/* Background Image with Overlay */}
      <div
        className="fixed inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?ixlib=rb-1.2.1&auto=format&fit=crop&w=2076&q=80')] bg-cover bg-center transition-transform duration-700 hover:scale-105"
        style={{ filter: "brightness(0.6)" }}
      />

      {/* Dark/Light mode sensitive overlay */}
      <div className="fixed inset-0 z-0 bg-background/40 backdrop-blur-[2px] transition-colors duration-500" />

      {/* Top Controls */}
      <div className="absolute top-6 right-6 z-20 flex items-center gap-4 bg-background/50 backdrop-blur-md p-2 rounded-full border border-border shadow-lg">
        <ThemeToggle />
        <div className="h-4 w-px bg-border" />
        <LanguageSwitcher />
      </div>

      {/* Glassmorphism Card */}
      <Card className="relative z-10 w-full max-w-md bg-background/80 backdrop-blur-xl border-border/50 shadow-2xl animate-in fade-in zoom-in duration-700 rounded-4xl overflow-hidden">
        <CardHeader className="space-y-4 text-center pt-10 pb-6">
          <div className="mx-auto h-12 w-12 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
            <span className="text-primary-foreground font-black text-2xl">
              S
            </span>
          </div>
          <div className="space-y-1.5">
            <CardTitle className="text-4xl font-black tracking-tighter">
              Safari HR
            </CardTitle>
            <CardDescription className="text-secondary-foreground font-bold uppercase tracking-[0.2em] text-xs">
              {t("loginTitle")}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="px-8 pb-10">
          <LoginForm />

          <div className="mt-8 text-center">
            <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">
              {t("authorizedOnly")}
            </p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
