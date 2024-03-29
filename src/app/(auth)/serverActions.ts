'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import {
  createClient,
  createServiceRoleClient,
} from '@/common/services/auth/supabase/server'

interface AuthActionResponse {
  error?: {
    message: string
  }
}

interface LoginActionProps {
  email: string
  password: string
}

export async function login({
  email,
  password,
}: LoginActionProps): Promise<AuthActionResponse> {
  const supabase = createClient()

  const data = {
    email,
    password,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  // TODO handle error cases
  if (error) {
    console.log('error: ', error)
    return {
      error: {
        message: error.message,
      },
    }
  }

  // purges cache for declared path, but I don't fully understand why yet
  revalidatePath('/', 'layout')
  redirect('/')
}

interface SignupActionProps {
  email: string
  password: string
}

// TODO make this all atomic somehow.  a user should always exist in both the auth system and the database
export async function signup({
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

  // purges cache for declared path, but I don't fully understand why yet
  revalidatePath('/', 'layout')
  redirect('/')
}
