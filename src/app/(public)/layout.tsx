import { AuthModal } from './_components/AuthModal'

interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div
      className="w-full h-screen flex flex-col items-center justify-center bg-no-repeat bg-cover"
      style={{ backgroundImage: 'url(/login/lavender-blue-graph.webp)' }}
    >
      <AuthModal>{children}</AuthModal>
    </div>
  )
}
