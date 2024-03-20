'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/services/auth/supabase/server'

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

export async function signup({
    email,
    password,
}: SignupActionProps): Promise<AuthActionResponse> {
    const supabase = createClient()

    // TODO type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
        email,
        password,
    }

    const { error } = await supabase.auth.signUp(data)

    // TODO handle error cases
    if (error) {
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
