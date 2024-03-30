'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/common/data/supabase/server'
import { CANDIDATE_HOME_PAGE } from '@/common/data/config/appConfig'

interface AuthActionResponse {
  error?: {
    message: string
  }
}

interface LoginActionProps {
  email: string
  password: string
}

export async function logIn({
  email,
  password,
}: LoginActionProps): Promise<AuthActionResponse> {
  const supabase = createClient()

  const data = {
    email,
    password,
  }

  const { error, data: signInResponseData } =
    await supabase.auth.signInWithPassword(data)

  // TODO handle error cases
  if (error) {
    if (error.message === 'Email not confirmed') {
      redirect('/verify-email/pending')
    }

    console.error('error: ', error)
    return {
      error: {
        message: error.message,
      },
    }
  }

  // purges cache for ALL paths, but there are potentially some nuances between server and client caches...
  // https://nextjs.org/docs/app/api-reference/functions/revalidatePath#revalidating-all-data
  revalidatePath('/', 'layout')
  redirect(CANDIDATE_HOME_PAGE)
}
