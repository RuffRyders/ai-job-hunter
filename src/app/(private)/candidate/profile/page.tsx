'use client'

import { ProfileForm } from '@/features/profile/ui/ProfileForm'

export default function Profile() {
  return (
    <div className="h-full p-6 container mx-auto">
      <div className="h-full flex flex-col gap-2">
        <ProfileForm />
      </div>
    </div>
  )
}
