import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import { withAuth } from "next-auth/middleware"

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req })
    const pathname = req.nextUrl.pathname

    const isAuth = !!token
    const isAuthPage = pathname === "/"
    const isAdminPage = pathname !== "/"

    if (!isAuth && !isAuthPage) {
      return NextResponse.redirect(new URL("/", req.url))
    }

    if (isAuth && !isAdminPage) {
      return NextResponse.redirect(new URL("/dashboard/overview", req.url))
    }

    return null
  },
  {
    callbacks: {
      async authorized() {
        // This is a work-around for handling redirect on auth pages.
        // We return true here so that the middleware function above
        // is always called.
        return true
      },
    },
  }
)

export const config = {
  matcher: ["/:path*"],
}
