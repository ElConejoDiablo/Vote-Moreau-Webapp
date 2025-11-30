export default function middleware(request) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  
  // Allow access to password page and API route
  if (pathname === '/api/auth' || pathname === '/password.html' || pathname.startsWith('/api/')) {
    return;
  }
  
  // Check for authentication cookie
  const cookie = request.headers.get('cookie') || '';
  const isAuthenticated = cookie.includes('auth_token=authenticated');
  
  if (!isAuthenticated) {
    // Redirect to password page
    const redirectUrl = new URL('/password.html', request.url);
    return new Response(null, {
      status: 302,
      headers: {
        'Location': redirectUrl.toString(),
      },
    });
  }
  
  // Allow access - return undefined to continue
  return;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - password.html (password page itself)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|password.html|.*\\.(ico|png|jpg|jpeg|svg|gif|webp)).*)',
  ],
};

