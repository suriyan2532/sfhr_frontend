import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { API_ENDPOINTS } from "@/lib/api-config";

async function authenticateWithBackend(username: string, password: string) {
  try {
    const response = await fetch(API_ENDPOINTS.auth.login, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      console.error("Backend authentication failed:", response.statusText);
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to authenticate with backend:", error);
    return null;
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ username: z.string(), password: z.string().min(1) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { username, password } = parsedCredentials.data;

          // Call backend API for authentication
          const user = await authenticateWithBackend(username, password);
          if (user) {
            return {
              id: user.id || user.userId || "user-id",
              username: user.username || username,
              name: user.name || user.fullName || username,
              email: user.email || `${username}@safarihr.com`,
              role: user.role || "USER",
              accessToken: user.accessToken || user.token, // Ensure we capture the token
            };
          }
        }

        console.log("Invalid credentials");
        return null;
      },
    }),
  ],
});
