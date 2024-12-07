import NextAuth, { NextAuthOptions, Session, Account } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import { verifyCredentials } from '@/app/services/authService';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '@/lib/prisma';

if (!process.env.NEXTAUTH_SECRET) {
  throw new Error('NEXTAUTH_SECRET is not defined in your environment variables.');
}

if (!process.env.GITHUB_ID || !process.env.GITHUB_SECRET) {
  throw new Error('GitHub Client ID and Secret are not defined in your environment variables.');
}

declare module 'next-auth' {
  interface User {
    id: string;
    email: string;
    username?: string;
    createdAt?: Date;
    updatedAt?: Date;
    emailVerified?: Date | null; // Add emailVerified to User type
  }

  interface Session {
    user: User;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),

    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Missing email or password');
        }

        const user = await verifyCredentials(credentials.email, credentials.password);

        if (user) {
          return user; 
        }

        return null;
      },
    }),
  ],

  pages: {
    signIn: '/Signin',
  },

  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: 'jwt', 
  },

  callbacks: {
    // signIn callback with corrected user handling
    async signIn({ user, account, profile }) {
      // Ensure required fields for NextAuth.User exist
      if (!user.email) return false;
  
      // Optionally map Prisma fields to NextAuth-compatible fields
      if ('password' in user) {
        // Strip sensitive information like password
        delete user.password;
      }
  
      return true;
    },

    // session callback with corrected user handling
    async session({ session, token, user }) {
      // Add Prisma-specific fields to the session
      if (token?.id) {
        session.user.id = token.id as string; // Assume token contains user ID
      }
  
      if (token?.username) {
        session.user.username = token.username as string;
      }
  
      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        // Add custom fields from Prisma User to the token
        token.id = user.id;
        token.username = user.username;
      }
      return token;
    },
  
  },

  debug: true,
};

export default NextAuth(authOptions);
