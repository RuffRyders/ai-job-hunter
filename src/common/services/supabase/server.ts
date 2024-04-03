import {
  NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY,
  SUPABASE_SERVICE_ROLE_KEY,
} from '@/common/data/config/appConfig'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { Database } from './database.types'

/**
 * https://supabase.com/docs/guides/auth/server-side/nextjs
 */

// TODO docs recommend using pkce for server side auth, but nextjs docs don't mention it
// https://supabase.com/docs/guides/auth/server-side-rendering#understanding-the-authentication-flow
// docs may be outdated

export function createClient() {
  const cookieStore = cookies()

  return createServerClient<Database>(
    NEXT_PUBLIC_SUPABASE_URL!,
    NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch (error) {
            // The `delete` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    },
  )
}

// * This is a service role client, it bypasses all RLS rules so use it with caution. Only use it for server side operations!
export function createServiceRoleClient() {
  const cookieStore = cookies()

  return createServerClient(
    NEXT_PUBLIC_SUPABASE_URL!,
    SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        // ! I don't think we want to do anything with cookies from the service role client. Could be dangerous
      },
    },
  )
}
