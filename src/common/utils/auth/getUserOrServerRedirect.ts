import { createClient } from '@/services/auth/supabase/server'
import { redirect } from 'next/navigation'

export async function getUserOrServerRedirect(
  {
    redirectTo = '/login',
  }: {
    redirectTo?: string
  } = { redirectTo: '/login' },
) {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) {
    redirect(redirectTo)
  }

  return data.user
}
