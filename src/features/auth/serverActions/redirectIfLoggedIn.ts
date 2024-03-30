'use server'

import { createClient } from '@/common/services/auth/supabase/server'
import { redirect } from 'next/navigation'

export const redirectIfLoggedIn = async () => {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()

  if (data.user) {
    redirect('/')
  }

  return
}
