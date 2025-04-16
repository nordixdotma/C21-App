import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { jwtVerify } from "jose"

// Define protected routes that require authentication
const protectedRoutes = [
  "/dashboard",
  "/dashboard/add-project",
  "/dashboard/edit-project",
  "/agent-dashboard",
  "/client-dashboard",
]

// Define role-based access control
const roleBasedRoutes = {
  admin: ["/dashboard"],
  agent: ["/agent-dashboard"],
  client: ["/client-dashboard"],
}

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Check if the path is a protected route
  const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route))

  if (!isProtectedRoute) {
    return NextResponse.next()
  }

  // Get the token from the cookies
  const token = request.cookies.get("token")?.value

  // If there's no token, redirect to login
  if (!token) {
    const url = new URL("/login", request.url)
    url.searchParams.set("callbackUrl", encodeURI(request.url))
    return NextResponse.redirect(url)
  }

  try {
    // Verify the token
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || "fallback_secret")
    const { payload } = await jwtVerify(token, secret)

    // Check role-based access
    const userRole = payload.role as string

    // Admin can access all routes
    if (userRole === "admin") {
      return NextResponse.next()
    }

    // Check if the user has access to the current route
    const hasAccess = roleBasedRoutes[userRole as keyof typeof roleBasedRoutes]?.some((route) => path.startsWith(route))

    if (!hasAccess) {
      // Redirect to appropriate dashboard based on role
      if (userRole === "agent") {
        return NextResponse.redirect(new URL("/agent-dashboard", request.url))
      } else if (userRole === "client") {
        return NextResponse.redirect(new URL("/client-dashboard", request.url))
      } else {
        return NextResponse.redirect(new URL("/login", request.url))
      }
    }

    return NextResponse.next()
  } catch (error) {
    // If token verification fails, redirect to login
    const url = new URL("/login", request.url)
    url.searchParams.set("callbackUrl", encodeURI(request.url))
    return NextResponse.redirect(url)
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/agent-dashboard/:path*", "/client-dashboard/:path*"],
}
