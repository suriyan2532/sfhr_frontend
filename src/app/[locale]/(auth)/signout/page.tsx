import { getTranslations } from "next-intl/server";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";
import { LogOut, ArrowLeft } from "lucide-react";
import { signOut } from "@/auth";
import { Link } from "@/navigation";

export default async function SignOutPage() {
  const t = await getTranslations("Auth");

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-gray-100 dark:bg-[#1e1e1e] flex items-center justify-center font-[Rubik,sans-serif] transition-colors duration-300">
      {/* Background Image - Matches Login Page */}
      <div
        className="fixed inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?ixlib=rb-1.2.1&auto=format&fit=crop&w=2076&q=80')] bg-cover bg-center transition-transform duration-700 hover:scale-105 opacity-20 dark:opacity-100"
        style={{ filter: "brightness(0.7)" }}
      />

      {/* Gradient Overlay */}
      {/* eslint-disable-next-line */}
      <div className="fixed inset-0 z-0 bg-gradient-to-t from-white/80 via-white/40 to-transparent dark:from-black/80 dark:via-black/40 dark:to-transparent" />

      {/* Top Bar Tools */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-3">
        <ThemeToggle />
        <div className="h-6 w-[1px] bg-gray-300 dark:bg-white/20" />
        <LanguageSwitcher />
      </div>

      {/* Glass Container */}
      <div className="relative z-10 w-full max-w-md p-8 sm:p-10 mx-4 bg-white/70 dark:bg-white/10 backdrop-blur-xl border border-gray-200 dark:border-white/20 rounded-3xl shadow-2xl animate-in fade-in zoom-in duration-500">
        <div className="mb-8 text-center space-y-4">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/20 mb-4">
            <LogOut className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
            {t("signOutTitle")}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-base">
            {t("signOutConfirm")}
          </p>
        </div>

        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/login" });
          }}
          className="space-y-4"
        >
          <button
            type="submit"
            className="w-full flex items-center justify-center py-4 px-4 border border-transparent rounded-2xl shadow-xl text-lg font-bold text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            {t("signOutButton")}
          </button>

          <Link
            href="/dashboard"
            className="w-full flex items-center justify-center py-4 px-4 border border-gray-300 dark:border-white/20 rounded-2xl shadow-sm text-lg font-bold text-gray-700 dark:text-white bg-white/50 dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 transition-all duration-300"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            {t("cancelButton")}
          </Link>
        </form>

        <div className="mt-10 text-center">
          <p className="text-xs text-gray-500 dark:text-white/40 uppercase tracking-widest font-bold">
            Safari HR
          </p>
        </div>
      </div>
    </main>
  );
}
