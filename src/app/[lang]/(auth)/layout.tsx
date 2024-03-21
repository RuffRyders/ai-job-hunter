interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div
      className="w-full h-screen flex bg-no-repeat bg-cover"
      style={{ backgroundImage: 'url(/login/lavender-blue-graph.webp)' }}
    >
      {children}
    </div>
  )
}
