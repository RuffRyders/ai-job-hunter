'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/services/auth/supabase/server'

interface LoginProps {
    email: string
    password: string
}

export async function login(formData: LoginProps) {
    const supabase = createClient()

    const data = {
        email: formData.email,
        password: formData.password,
    }

    const { error } = await supabase.auth.signInWithPassword(data)

    if (error) {
        redirect('/error')
    }

    revalidatePath('/', 'layout')
    redirect('/')
}

export async function signup(formData: LoginProps) {
    const supabase = createClient()

    const data = {
        email: formData.email,
        password: formData.password,
    }

    const { error } = await supabase.auth.signUp(data)

    if (error) {
        redirect('/error')
    }

    revalidatePath('/', 'layout')
    redirect('/')
}
