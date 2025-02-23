// import NextAuth, { DefaultSession } from "next-auth";

// declare module "next-auth" {
//   interface Session {
//     accessToken?: string; // Add token property
//   }
// }


import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    username?: string;
    id: string;
    name: string;
    email: string;
    image?: string;
    token?: string;  // ✅ Add this property
   
  }

  interface Session {
    user: User;
    accessToken?: string;
  }
  interface JWT {
    id: string;
    email: string;
    username?: string; // ✅ Ensure username is included in JWT
    accessToken?: string;
  }
}
