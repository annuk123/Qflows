// import NextAuth, { NextAuthOptions, Session, Account } from 'next-auth';
// import GitHubProvider from 'next-auth/providers/github';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import { verifyCredentials } from '@/app/services/authService';
// import { PrismaAdapter } from '@next-auth/prisma-adapter';
// import { prisma } from '@/lib/prisma';

// if (!process.env.NEXTAUTH_SECRET) {
//   throw new Error('NEXTAUTH_SECRET is not defined in your environment variables.');
// }

// if (!process.env.GITHUB_ID || !process.env.GITHUB_SECRET) {
//   throw new Error('GitHub Client ID and Secret are not defined in your environment variables.');
// }

// declare module 'next-auth' {
//   interface User {
//     id: string;
//     email: string;
//     username?: string;
//     createdAt?: Date;
//     updatedAt?: Date;
//     emailVerified?: Date | null; // Add emailVerified to User type
//   }

//   interface Session {
//     user: User;
//   }
// }

// export const authOptions: NextAuthOptions = {
//   providers: [
//     GitHubProvider({
//       clientId: process.env.GITHUB_ID ?? '',
//       clientSecret: process.env.GITHUB_SECRET ?? '',
//     }),

//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {
//         email: { label: 'Email', type: 'email' },
//         password: { label: 'Password', type: 'password' },
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) {
//           throw new Error('Missing email or password');
//         }

//         const user = await verifyCredentials(credentials.email, credentials.password);

//         if (user) {
//           return user; 
//         }

//         return null;
//       },
//     }),
//   ],

//   pages: {
//     signIn: '/Signin',
//   },

//   adapter: PrismaAdapter(prisma),
//   secret: process.env.NEXTAUTH_SECRET,

//   session: {
//     strategy: 'jwt', 
//   },

//   callbacks: {
//     // signIn callback with corrected user handling
//     async signIn({ user, account, profile }) {
//       // Ensure required fields for NextAuth.User exist
//       if (!user.email) return false;
  
//       // Optionally map Prisma fields to NextAuth-compatible fields
//       if ('password' in user) {
//         // Strip sensitive information like password
//         delete user.password;
//       }
  
//       return true;
//     },

//     // session callback with corrected user handling
//     async session({ session, token, user }) {
//       // Add Prisma-specific fields to the session
//       if (token?.id) {
//         session.user.id = token.id as string; // Assume token contains user ID
//       }
  
//       if (token?.username) {
//         session.user.username = token.username as string;
//       }
  
//       return session;
//     },

//     async jwt({ token, user }) {
//       if (user) {
//         // Add custom fields from Prisma User to the token
//         token.id = user.id;
//         token.username = user.username;
//       }
//       return token;
//     },
  
//   },

//   debug: true,
// };

// export default NextAuth(authOptions);


// import NextAuth, { NextAuthOptions } from 'next-auth';
// import GitHubProvider from 'next-auth/providers/github';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import { verifyCredentials } from '@/app/services/authService';
// import { PrismaAdapter } from '@next-auth/prisma-adapter';
// import { prisma } from '@/lib/prisma';
// import nodemailer from "nodemailer";
// import { sendThankYouEmail } from '@/app/utils/sendEmail';
// import EmailProvider from "next-auth/providers/email"; // ✅ Import EmailProvider
// import { Resend } from "resend"; // ✅ Import Resend

// const resend = new Resend(process.env.RESEND_API_KEY); // ✅ Initialize Resend

// if (!process.env.NEXTAUTH_SECRET) {
//   throw new Error('NEXTAUTH_SECRET is not defined in your environment variables.');
// }

// if (!process.env.GITHUB_ID || !process.env.GITHUB_SECRET) {
//   throw new Error('GitHub Client ID and Secret are not defined in your environment variables.');
// }

// // Extend NextAuth types to include custom user properties
// declare module 'next-auth' {
//   interface User {
//     id: string;
//     email: string;
//     username?: string;
//     createdAt?: Date;
//     updatedAt?: Date;
//     emailVerified?: Date | null;
//   }

//   interface Session {
//     user: User;
//   }

//   interface JWT {
//     id: string;
//     username?: string;
//   }
// }

// export const authOptions: NextAuthOptions = {
//   providers: [
//     GitHubProvider({
//       clientId: process.env.GITHUB_ID ?? '',
//       clientSecret: process.env.GITHUB_SECRET ?? '',
//     }),


//     EmailProvider({
//       sendVerificationRequest: async ({ identifier: email, url }) => {
//         try {
//           await resend.emails.send({
//             from: process.env.EMAIL_FROM as string,
//             to: email,
//             subject: "Sign in to Your Account",
//             html: `<p>Click <a href="${url}">here</a> to sign in.</p>`,
//           });
//         } catch (error) {
//           console.error("Error sending email:", error);
//           throw new Error("Email sending failed");
//         }
//       },
//     }),


    

//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials, req) {
//         if (!credentials?.email || !credentials?.password) {
//           throw new Error("Missing email or password");
//         }
    
//         const user = await verifyCredentials(credentials.email, credentials.password);
//         if (!user) throw new Error("Invalid email or password");
    
//         // ✅ Corrected: Removed duplicate `user` declaration
//         return {
//           id: user.id,
//           email: user.email,
//           name: user.username, // Ensure `username` is returned properly
//         };
//       },
//     }),
//   ],    

  

//   pages: {
//     signIn: '/Signin',
//   },

//   adapter: PrismaAdapter(prisma),
//   secret: process.env.NEXTAUTH_SECRET,

//   session: {
//     strategy: 'jwt',
//   },

//   callbacks: {
//     async signIn({ user }) {
//       if (!user.email) return false;
//        await sendThankYouEmail(user.email);
//       return true;
//     },


//     async session({ session, token }) {
//       //session.accessToken = token.accessToken as string;
//       if (session.user) {
//         session.user.token = token.accessToken as string; // ✅ Ensure token is set
//       }
//       if (token?.id) {
//         session.user.id = token.id as string;
//       }
//       if (token?.username) {
//         session.user.username = token.username as string;
//       }
//       return session;
      
//     },

//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//         token.username = user.username;
//         token.accessToken = user.token;
//       }
//       return token;
//     },
//   },

//   // callbacks: {
//   //   async signIn({ user }) {
//   //     await sendThankYouEmail(user.email);
//   //     return true;
//   //   },
//   // },

//   debug: true,
// };

// export default NextAuth(authOptions);




import NextAuth, { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyCredentials } from "@/app/services/authService";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { sendThankYouEmail } from "@/app/utils/sendEmail";
import EmailProvider from "next-auth/providers/email";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

if (!process.env.NEXTAUTH_SECRET) {
  throw new Error("NEXTAUTH_SECRET is not defined in your environment variables.");
}

if (!process.env.GITHUB_ID || !process.env.GITHUB_SECRET) {
  throw new Error("GitHub Client ID and Secret are not defined in your environment variables.");
}

// Extend NextAuth types to include custom user properties
declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    username?: string;
    createdAt?: Date;
    updatedAt?: Date;
    emailVerified?: Date | null;
  }

  interface Session {
    user: User;
    accessToken?: string; // ✅ Added accessToken in Session type
  }

  interface JWT {
    id: string;
    username?: string;
    accessToken?: string; // ✅ Added accessToken in JWT type
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),

    EmailProvider({
      sendVerificationRequest: async ({ identifier: email, url }) => {
        try {
          await resend.emails.send({
            from: process.env.EMAIL_FROM as string,
            to: email,
            subject: "Sign in to Your Account",
            html: `<p>Click <a href="${url}">here</a> to sign in.</p>`,
          });
        } catch (error) {
          console.error("Error sending email:", error);
          throw new Error("Email sending failed");
        }
      },
    }),

    // CredentialsProvider({
    //   name: "Credentials",
    //   credentials: {
    //     email: { label: "Email", type: "email" },
    //     password: { label: "Password", type: "password" },
    //   },
    //   async authorize(credentials, req) {
    //     if (!credentials?.email || !credentials?.password) {
    //       throw new Error("Missing email or password");
    //     }

    //     const user = await verifyCredentials(credentials.email, credentials.password);
    //     if (!user) throw new Error("Invalid email or password");

    //     return {
    //       id: user.id,
    //       email: user.email,
    //       username: user.username ?? "", // ✅ Ensure `username` is returned properly
    //     };
    //   },
    // }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }
    
        const user = await verifyCredentials(credentials.email, credentials.password);
        if (!user) throw new Error("Invalid email or password");
    
        return {
          id: user.id,
          email: user.email,
          name: user.email, // Use email as name
          username: (user as any).username ?? "", // Ensure username is returned properly
        }
      },
    }),
    
  ],

  pages: {
    signIn: "/Signin",
  },

  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false;
      await sendThankYouEmail(user.email);
      return true;
    },

    async session({ session, token }) {
      if (session.user) {
        //...session.user,   // ✅ Spread existing user properties
        session.user.id = token.id as string;
        session.user.email = token.email ?? '';
        session.user.username = typeof token.username === 'string' ? token.username : "";
      }
      session.accessToken = token.accessToken as string; // ✅ Assign accessToken correctly
      return session;
    },



    
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.username = user.username ?? "";
        token.accessToken = `generated-token-${user.id}`; // ✅ Generate a token if needed
      }
      return token;
    },
  },

  debug: true,
};

export default NextAuth(authOptions);
