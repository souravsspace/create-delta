import type { NextRequest } from "next/server";

const apiRoute = "/api";
const authRoutes = ["/login", "/signup", "/verify-email"];
const privateRoutes = ["/profile"];

export function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const authCookie = request.cookies.get("auth_session");

  const isLoggedIn = !!authCookie?.value;

  const isApiRoute = nextUrl.pathname.startsWith(apiRoute);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isPrivateRoute = privateRoutes.includes(nextUrl.pathname);

  if (isApiRoute) {
    return null;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL("/", nextUrl));
    }
    return null;
  }

  if (isPrivateRoute) {
    if (!isLoggedIn) {
      return Response.redirect(new URL("/", nextUrl));
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
