import {
  NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY,
} from '@/common/config/appConfig'
import { createBrowserClient } from '@supabase/ssr'

/**
 * https://supabase.com/docs/guides/auth/server-side/nextjs
 */

export function createClient() {
  return createBrowserClient(
    NEXT_PUBLIC_SUPABASE_URL!,
    NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )
}
