import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login'
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnBookings = nextUrl.pathname.startsWith('/reservar');
      if (isOnBookings) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        //TODO: Check this redirect
        // return Response.redirect(new URL('/reservar', nextUrl));
      }
      return true;
    }
  },
  providers: []
} satisfies NextAuthConfig;
