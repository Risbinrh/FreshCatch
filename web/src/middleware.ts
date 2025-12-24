import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Public routes that don't require authentication
  const publicRoutes = ['/', '/login', '/register', '/terms', '/privacy', '/contact', '/catalog', '/recipes'];

  const { pathname } = request.nextUrl;

  // Check if the current path is a public route
  const isPublicRoute = publicRoutes.some(route => pathname === route || pathname.startsWith(route + '/'));

  // Allow access to public routes and static files
  if (isPublicRoute || pathname.startsWith('/_next') || pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  // Check if user is authenticated (checking for auth cookie or token)
  const userCookie = request.cookies.get('freshcatch_user');

  // If no user cookie found, redirect to landing page
  if (!userCookie) {
    const landingUrl = new URL('/', request.url);
    return NextResponse.redirect(landingUrl);
  }

  return NextResponse.next();
}

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
