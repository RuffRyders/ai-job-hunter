import {
  NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY,
} from '@/common/data/config/appConfig'
import { createBrowserClient } from '@supabase/ssr'
import { Database } from './database.types'

/**
 * https://supabase.com/docs/guides/auth/server-side/nextjs
 */

export function createClient() {
  return createBrowserClient<Database>(
    NEXT_PUBLIC_SUPABASE_URL!,
    NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )
}
