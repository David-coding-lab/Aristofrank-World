import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const protectedPrefixes = [
  "/dashboard",
  "/profile",
]

const authPages = ["/sign-in", "/sign-up"]

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const sessionCookie =
    request.cookies.get("a_session") ??
    request.cookies.get(`a_session_${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`)

  const isAuthenticated = !!sessionCookie?.value

  if (protectedPrefixes.some((prefix) => pathname.startsWith(prefix))) {
    if (!isAuthenticated) {
      const signInUrl = new URL("/sign-in", request.url)
      signInUrl.searchParams.set("redirect", pathname)
      return NextResponse.redirect(signInUrl)
    }
  }

  if (authPages.includes(pathname) && isAuthenticated) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon\\.ico|.*\\.svg$).*)"],
}
