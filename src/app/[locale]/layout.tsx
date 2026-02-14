import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "../globals.css"; // Fixed import path
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

const kanit = Kanit({
  subsets: ["latin", "thai"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-kanit",
});

export const metadata: Metadata = {
  title: "Safari HR System v1.0.0",
  description: "HR Management System",
};

import { ThemeProvider } from "@/components/common/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "@/components/providers/SessionProvider";

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${kanit.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages}>
            <SessionProvider>{children}</SessionProvider>
            <Toaster />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
