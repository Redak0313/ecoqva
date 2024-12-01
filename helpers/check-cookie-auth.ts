import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

export function isUserAuthenticated(cookies: ReadonlyRequestCookies) {
  const session = cookies.get('authjs.session-token');
  return !!session?.value;
}
