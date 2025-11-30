export default function middleware(request) {
  const url = new URL(request.url);
  
  // Allow access to password page and API route
  if (url.pathname === '/api/auth' || url.pathname === '/password.html') {
    return;
  }
  
  // Check for authentication cookie
  const cookie = request.headers.get('cookie');
  const isAuthenticated = cookie && cookie.includes('auth_token=authenticated');
  
  if (!isAuthenticated) {
    // Redirect to password page
    return Response.redirect(new URL('/password.html', request.url), 302);
  }
  
  // Allow access to the main page
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
    '/((?!api|_next/static|_next/image|favicon.ico|password.html).*)',
  ],
};

