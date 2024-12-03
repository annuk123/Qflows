


import NextAuth from 'next-auth';
import { authOptions } from '@/app/config/authOptions';

const handler = NextAuth(authOptions);
//console.log('GITHUB_ID:', process.env.GITHUB_ID);
//console.log('GITHUB_SECRET:', process.env.GITHUB_SECRET);
//console.log('NEXTAUTH_SECRET:', process.env.NEXTAUTH_SECRET);



export { handler as GET, handler as POST };
