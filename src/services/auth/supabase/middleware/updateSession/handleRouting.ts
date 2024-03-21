import { NON_AUTH_ROUTES } from '@/constants'
import { User } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

interface HandleRoutingParams {
  request: NextRequest
  response: NextResponse
  user?: User | null
  error?: any
}

export const handleRouting = ({
  request,
  response,
  user,
  error,
}: HandleRoutingParams) => {
  const path = request.nextUrl.pathname
  console.log('user: ', user)

  // if the request is an API request, we don't need to handle routing
  if (path.startsWith('/api/')) {
    return response
  }

  const authRoute = !NON_AUTH_ROUTES.get(path)
  const userIsAuthenticated = user && !error

  if (userIsAuthenticated) {
    return response
  }

  if (!authRoute) {
    return response
  }

  // user is not authenticated and the route requires authentication

  if (!user?.email_confirmed_at) {
    if (request.nextUrl.pathname === '/verify-email') {
      return response
    }
    return NextResponse.redirect(new URL('/verify-email', request.url))
  }

  if (request.nextUrl.pathname !== '/signup') {
    return NextResponse.redirect(new URL('/signup', request.url))
  } else {
    return response
  }
}
