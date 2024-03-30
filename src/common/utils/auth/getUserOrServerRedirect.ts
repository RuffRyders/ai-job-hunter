import { createClient } from '@/features/auth/supabase/server'
import { redirect } from 'next/navigation'

interface Params {
  redirectTo?: string
}

/**
 * Should rename this to "handleProtectedRoute" or something similar
 * If user is not logged in, redirect to the login page
 * If user is logged in, but email is not verified, redirect to the verify email page
 */
export async function getUserOrServerRedirect(params?: Params) {
  const redirectTo = params?.redirectTo || '/login'

  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()
  const emailVerified = data?.user?.email_confirmed_at

  if (error || !data?.user) {
    redirect(redirectTo)
  }

  if (!emailVerified) {
    redirect('/verify-email/pending')
  }

  return data.user
}
