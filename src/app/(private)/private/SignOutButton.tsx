'use client'

import { Button } from '@/common/ui/Button/Button'
import { createClient } from '@/common/services/supabase/client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function SignOutButton() {
  const supabase = createClient()
  const router = useRouter()

  const [loading, setLoading] = useState(false)

  const handleSignOut = async () => {
    setLoading(true)
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <Button
      onPress={handleSignOut}
      className="button block"
      type="button"
      aria-disabled={loading}
      isDisabled={loading}
    >
      Sign Out
    </Button>
  )
}
