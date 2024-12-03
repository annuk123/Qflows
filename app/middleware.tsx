import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from './config/authOptions'; // Import authOptions correctly
import { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  // Get the session using getServerSession, which works with NextRequest
  const session = await getServerSession({ req, ...authOptions });  // Correct argument passing

  // If there is no session, redirect to the sign-in page
  if (!session) {
    return NextResponse.redirect(new URL('/signIn', req.url));
  }

  // Allow the request to proceed if authenticated
  return NextResponse.next();
}

// Define which routes should be protected
export const config = {
  matcher: ['/dashboard', '/profile'], // Protect these routes
};
