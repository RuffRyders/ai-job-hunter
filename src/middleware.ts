import { type NextRequest, NextResponse } from 'next/server'
import updateSession from '@/services/auth/supabase/middleware/updateSession'

/**
 * Nextjs Docs
 * https://nextjs.org/docs/app/building-your-application/routing/middleware#conditional-statements
 */

let locales = ['en-us', 'nl-nl', 'nl']

// Get the preferred locale, similar to the above or using a library
function getLocale(request: NextRequest) {
  return 'en-us'
}

// Paths that don't require authentication
// TODO routing path pattern to group auth routes or something? (/public/...)
const nonAuthRoutes = ['/login', '/signup']

export async function middleware(request: NextRequest) {
  // * Example of how to conditionally call middleware
  // if (request.nextUrl.pathname.startsWith('/about')) {
  //     return NextResponse.rewrite(new URL('/about-2', request.url))
  // }
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  )

  if (pathnameHasLocale) {
    return await updateSession(request, nonAuthRoutes)
  }

  // Redirect if there is no locale
  const locale = getLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname}`
  // e.g. incoming request is /products
  // The new URL is now /en-US/products
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
