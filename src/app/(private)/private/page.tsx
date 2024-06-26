import { getUserData } from '@/common/data/api/user/getUserData'
import { SignOutButton } from './SignOutButton'

export default async function PrivatePage() {
  const { data, error } = await getUserData()

  if (error || !data) {
    alert(`Something went wrong: ${error}`)
  }

  return (
    <div>
      <p className="mb-10">Hello {data?.email}</p>

      <SignOutButton />
    </div>
  )
}
