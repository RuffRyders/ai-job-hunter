'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createServiceRoleClient } from '@/common/services/auth/supabase/server'

interface AuthActionResponse {
  error?: {
    message: string
  }
}

interface SignupActionProps {
  email: string
  password: string
}

// TODO make this all atomic somehow.  a user should always exist in both the auth system and the database
export async function signUp({
  email,
  password,
}: SignupActionProps): Promise<AuthActionResponse> {
  const supabaseServiceRole = createServiceRoleClient()

  // TODO type-casting here for convenience
  // in practice, you should validate your inputs
  const signUpData = {
    email,
    password,
  }

  const { error: signUpError, data: userAuthData } =
    await supabaseServiceRole.auth.signUp(signUpData)

  // TODO handle error cases
  if (signUpError) {
    return {
      error: {
        message: signUpError.message,
      },
    }
  } else if (!userAuthData || !userAuthData.user?.id) {
    return {
      error: {
        message: 'No user data returned',
      },
    }
  }

  const { data, error: insertError } = await supabaseServiceRole
    .from('users')
    .insert({ email, id: userAuthData.user.id })

  if (insertError) {
    return {
      error: {
        message: insertError.message,
      },
    }
  }

  // purges cache for ALL paths, but there are potentially some nuances between server and client caches...
  // https://nextjs.org/docs/app/api-reference/functions/revalidatePath#revalidating-all-data
  revalidatePath('/', 'layout')
  redirect('/verify-email/pending')
}
