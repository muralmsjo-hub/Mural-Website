import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { auth } from "@/lib/auth/auth";

const handleI18nRouting = createMiddleware(routing);
const authRoute: string[] = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/verify-email",
];
const userRoutes: string[] = ["/change-password"];
const adminRoutes: string[] = ["/admin"];
export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAuthRoute = authRoute.some((route) => pathname.startsWith(route));

  const isUserRoute = userRoutes.some((route) => pathname.startsWith(route));

  const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route));

  if (isAdminRoute || isAuthRoute || isUserRoute) {
    const session = await auth();

    if (isAdminRoute) {
      if (!session || session.user?.role !== "admin") {
        return NextResponse.redirect(new URL("/", request.url));
      }
      return NextResponse.next();
    }

    if (isAuthRoute && session) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    if (isUserRoute && !session) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return handleI18nRouting(request);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
