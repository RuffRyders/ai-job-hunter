import { type NextRequest } from 'next/server'
import updateSession from '@/services/auth/supabase/middleware/updateSession'

/**
 * Nextjs Docs
 * https://nextjs.org/docs/app/building-your-application/routing/middleware#conditional-statements
 */

// Paths that don't require authentication
// TODO routing path pattern to group auth routes or something? (/public/...)
const nonAuthRoutes = ['/login', '/signup']

export async function middleware(request: NextRequest) {
  return await updateSession(request, nonAuthRoutes)

  // * Example of how to conditionally call middleware
  // if (request.nextUrl.pathname.startsWith('/about')) {
  //     return NextResponse.rewrite(new URL('/about-2', request.url))
  // }
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
