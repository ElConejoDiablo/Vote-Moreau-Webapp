export const config = {
  runtime: 'edge',
};

export default async function handler(request) {
  const url = new URL(request.url);
  const path = url.pathname;

  if (path === '/password.html' || path.startsWith('/api/')) {
    return fetch(new URL(path, request.url), request);
  }

  const cookie = request.headers.get('cookie') || '';
  const authenticated = cookie.includes('auth_token=authenticated');

  if (!authenticated) {
    return Response.redirect(new URL('/password.html', request.url), 302);
  }

  return fetch(new URL('/index.html', request.url), request);
}
