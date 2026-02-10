import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

async function getUser(username: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });
    return user;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        // MOCK AUTHENTICATION: Allow any username/password as requested
        const parsedCredentials = z
          .object({ username: z.string(), password: z.string().min(1) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { username, password } = parsedCredentials.data;
          
          // MOCK AUTHENTICATION: Enforce specific credentials
          if (username === 'admin' && password === 'P@ssw0rd') {
            return {
              id: 'mock-admin-id',
              username: username,
              name: 'Administrator',
              email: 'admin@safarihr.com',
              role: 'SUPER_ADMIN', 
            };
          }
        }

        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});
