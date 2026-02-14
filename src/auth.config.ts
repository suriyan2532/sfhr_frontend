import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
    signOut: "/signout",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.includes("/dashboard");
      const isOnAuth =
        nextUrl.pathname.includes("/login") ||
        nextUrl.pathname.includes("/register");

      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn && isOnAuth) {
        // Redirect to dashboard if trying to access auth pages while logged in
        const localeStub = nextUrl.pathname.split("/")[1];
        const validLocales = ["en", "th"];
        const locale = validLocales.includes(localeStub) ? localeStub : "th";
        return Response.redirect(new URL(`/${locale}/dashboard`, nextUrl));
      }
      return true;
    },
    // Add custom fields to the session
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role as string;
      }
      if (token.accessToken && session.user) {
        session.user.accessToken = token.accessToken as string;
      }
      if (token.name && session.user) {
        session.user.name = token.name;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.accessToken = user.accessToken;
        token.name = user.name;
      }
      return token;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
