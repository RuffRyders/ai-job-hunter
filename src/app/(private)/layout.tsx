import { AppLogger } from '@/common/services/Logger/Logger'
import AppHeader from '@/features/header/ui/AppHeader'
import { authOrRedirect } from '@/common/utils/auth/authOrRedirect'
import { getUserData } from '@/common/data/api/user/getUserData'

interface PrivateLayoutProps {
  children: React.ReactNode
}

export default async function PrivateLayout({ children }: PrivateLayoutProps) {
  await authOrRedirect()

  const { data, error } = await getUserData()

  if (error || !data) {
    AppLogger.debug(`PrivateLayout: error fetching user data: ${error}`)
    return <div>Something went wrong</div>
  }

  return (
    <div>
      <header>
        <AppHeader userData={data} />
      </header>

      {children}
    </div>
  )
}
