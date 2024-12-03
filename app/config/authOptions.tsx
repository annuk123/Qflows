// import NextAuth, { NextAuthOptions, Session, Account } from 'next-auth';
// import GitHubProvider from 'next-auth/providers/github';
// //import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { verifyCredentials } from '@/app/services/authService'; // Create this function for authenticating the user
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import { prisma } from "@/lib/prisma"; // Prisma instance
// import { User } from '@prisma/client';


// // Ensure NEXTAUTH_SECRET is defined
// if (!process.env.NEXTAUTH_SECRET) {
//   throw new Error('NEXTAUTH_SECRET is not defined in your environment variables.');
// }

// // Ensure GitHub credentials are defined
// if (!process.env.GITHUB_ID || !process.env.GITHUB_SECRET ) {
//   throw new Error('GitHub Client ID and Secret are not defined in your environment variables.');
// }

// // Export authOptions for use in other files like middleware
// export const authOptions = {
//   providers: [
//    GitHubProvider({
//       clientId: process.env.GITHUB_ID ?? '',
//       clientSecret: process.env.GITHUB_SECRET ?? '',
//     }),
//     // GoogleProvider({
//     //   clientId: process.env.GOOGLE_CLIENT_ID || '',
//     //   clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
//     // }),


//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//     async authorize(credentials) {
//       if (!credentials?.email || !credentials?.password) {
//         throw new Error("Missing email or password");
//       }

//       const user = await verifyCredentials(credentials.email, credentials.password);

//       if (user) {
//         return user;
//       }

//       return null;
//     },
//   }),
//   ],

//   pages: {
//     signIn: '/Signin',  // Custom sign-in page
//   },

 
//   adapter: PrismaAdapter(prisma), // Use Prisma adapter for session management
//   secret: process.env.NEXTAUTH_SECRET, // Always use a secure secret from environment variables

//   session: {
//     strategy: "jwt", // or "database"
//   },

//   callbacks: {
//     async signIn({ user, account, profile }: { user: User; account: Account; profile: any }) {
//       // Handle any sign-in logic here if needed
//       console.log("Sign In Callback", user, account, profile);
//       return true;
//     },
//     async session({ session, user }: { session: Session; user: User }) {
//       // You can add any extra session logic here
//       session.user.id = user.id as string; // Make sure to add custom properties to session if needed
//       return session;
//     },
//   },


//   debug: true, // Enable debug messages in the console during sign-in
// };

// export default NextAuth(authOptions);


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
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
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
