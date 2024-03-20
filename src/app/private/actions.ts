import { createClient } from '@/services/auth/supabase/server'
import { User } from '@supabase/supabase-js'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

interface AuthActionResponse {
    error?: {
        message: string
    }
}

export const signOut = async (): Promise<AuthActionResponse> => {
    const supabase = createClient()

    try {
        const {
            data: { user },
        } = await supabase.auth.getUser()

        if (user) {
            await supabase.auth.signOut()
        }
    } catch (err) {
        let errorMessage = ''

        if (err instanceof Error) {
            errorMessage = err.message
        } else {
            errorMessage = 'Unknown error'
        }

        return {
            error: {
                message: errorMessage,
            },
        }
    }

    revalidatePath('/', 'layout')
    redirect('/login')
}

interface LoadUserDataActionProps {
    user?: User
    error?: string
}

export async function loadUserData(): Promise<LoadUserDataActionProps> {
    const supabase = createClient()
    const { data, error } = await supabase.auth.getUser()

    if (error || !data?.user) {
        return { error: 'Internal error' }
    }

    return { user: data.user }
}
