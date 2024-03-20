import {
  NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY,
} from '@/config/appConfig'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { AppLogger } from '@/services/Logger/Logger'

/**
 * Update session cookies and redirect to login if the user is not authenticated
 */
async function updateSession(
  request: NextRequest,
  nonAuthRoutes: string[] = [],
) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    NEXT_PUBLIC_SUPABASE_URL!,
    NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    },
  )

  // Attempt to get the current user to check authentication status
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  // TODO connect to a logger / do we need to differentiate client-side and server-side loggers?
  if (error) {
    AppLogger.info('Error updating auth session: ', error.message)
  }

  const isExcludedPath = nonAuthRoutes.some((path) =>
    request.nextUrl.pathname.startsWith(path),
  )

  // If there's no user or an error, and not an excluded path, redirect to login.
  if ((!user || error) && !isExcludedPath) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // If the user is authenticated, continue with the response, possibly with updated cookies
  return response
}

export default updateSession
