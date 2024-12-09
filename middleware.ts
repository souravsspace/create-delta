import type { NextRequest } from "next/server";

import {
  apiRoute,
  authRoutes,
  afterLoginUrl,
  privateRoutes,
  SESSION_COOKIE_NAME,
  homeRouteNonAuth,
  publicRoutes,
} from "@/constants/app-config";

export function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const authCookie = request.cookies.get(SESSION_COOKIE_NAME);

  const isLoggedIn = !!authCookie?.value;
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isPrivateRoute = privateRoutes.includes(nextUrl.pathname);
  const isApiRoute = nextUrl.pathname.startsWith(apiRoute);
  /**
   * @PUBLIC ROUTES
   *
   * Here you can define the public routes which are accessible to everyone.
   * if you don't want to define any public routes, you can remove it fully.
   */
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const nonAuthHomeRoutes = nextUrl.pathname.startsWith(homeRouteNonAuth);

  if (isPublicRoute) {
    return null;
  }

  if (nonAuthHomeRoutes) {
    if (isLoggedIn) {
      return Response.redirect(new URL(afterLoginUrl, nextUrl));
    }
    return null;
  }
  /**
   * @PUBLIC ROUTES END
   *
   * Here you can define the api routes which are accessible to everyone.
   */

  if (isApiRoute) {
    return null;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(afterLoginUrl, nextUrl));
    }
    return null;
  }

  if (isPrivateRoute) {
    if (!isLoggedIn) {
      return Response.redirect(new URL(homeRouteNonAuth, nextUrl));
      /**
       * @REDIRECT
       *
       * redirect to home route non auth if user is not logged in and if no public route then redirect to login page
       */
    }
    return null;
  }

  return null;
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/((?!auth|verify-email|_next/static|_next/image|favicon.ico).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
