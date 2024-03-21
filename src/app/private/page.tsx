import { redirect } from 'next/navigation'
import { createClient } from '@/services/auth/supabase/server'
import { SignOutButton } from './SignOutButton'

export default async function PrivatePage() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()
  const user = data?.user

  if (error || !data?.user) {
    redirect('/login')
  }

  return (
    <div>
      <p className="mb-10">Hello {user?.email}</p>

      <SignOutButton />
    </div>
  )
}
