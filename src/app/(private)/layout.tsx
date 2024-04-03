import { AppLogger } from '@/common/services/Logger/Logger'
import fetchUserData from '@/features/header/data/fetchUserData'
import AppHeader from '@/features/header/ui/AppHeader'

interface PrivateLayoutProps {
  children: React.ReactNode
}

export default async function PrivateLayout({ children }: PrivateLayoutProps) {
  const { data, error } = await fetchUserData()

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
