import AppHeader from '@/features/header/ui/AppHeader'

interface PrivateLayoutProps {
  children: React.ReactNode
}

export default function PrivateLayout({ children }: PrivateLayoutProps) {
  return (
    <div>
      <header>
        <AppHeader />
      </header>

      {children}
    </div>
  )
}
