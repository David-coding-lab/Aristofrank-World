import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { SESSION_COOKIE } from "@/lib/auth/constants"

const protectedPrefixes = ["/dashboard", "/profile"]

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isAuthenticated = Boolean(request.cookies.get(SESSION_COOKIE)?.value)
  const isProtected = protectedPrefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  )

  if (isProtected && !isAuthenticated) {
    const signInUrl = new URL("/sign-in", request.url)
    signInUrl.searchParams.set(
      "redirect",
      `${pathname}${request.nextUrl.search}`,
    )
    return NextResponse.redirect(signInUrl)
  }

  // Auth pages remain reachable even if a stale cookie exists. The server
  // validates the session on protected pages, and a stale cookie must not trap
  // the visitor in a redirect loop.
  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon\\.ico|.*\\.svg$).*)"],
}
