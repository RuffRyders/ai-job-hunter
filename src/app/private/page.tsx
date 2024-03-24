import { SignOutButton } from './SignOutButton'
import { getUserOrServerRedirect } from '@/common/utils/auth/getUserOrServerRedirect'

export default async function PrivatePage() {
  const user = await getUserOrServerRedirect()

  return (
    <div>
      <p className="mb-10">Hello {user?.email}</p>

      <SignOutButton />
    </div>
  )
}
