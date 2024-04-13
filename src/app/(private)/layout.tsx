import { AppLogger } from '@/common/services/Logger/Logger'
import AppHeader from '@/features/header/ui/AppHeader'
import { authOrRedirect } from '@/common/utils/auth/authOrRedirect'
import { getUserData } from '@/common/data/api/user/getUserData'
import { Sidebar } from '@/features/sidebar/ui/Sidebar'

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
    <div className="flex flex-col w-full h-full">
      <header className="shrink-0 z-60">
        <AppHeader userData={data} />
      </header>

      <div className="flex flex-1 overflow-hidden">
        <div className="shrink-0 z-50">
          <Sidebar />
        </div>
        <div className="flex-1 overflow-auto">{children}</div>
      </div>
    </div>
  )
}
