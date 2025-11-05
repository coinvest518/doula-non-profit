import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // TODO: Implement Supabase auth middleware
  // const supabase = createServerClient(...)
  // const { data: { session } } = await supabase.auth.getSession()

  const protectedPaths = ["/dashboard", "/learn", "/checkout"]
  const isProtectedPath = protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path))

  // Mock authentication check
  const isAuthenticated = request.cookies.has("auth-token") // Replace with actual auth check

  if (isProtectedPath && !isAuthenticated) {
    // For demo purposes, allow access
    // In production, redirect to login:
    // return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/learn/:path*", "/checkout/:path*"],
}
