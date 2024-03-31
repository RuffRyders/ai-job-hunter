interface AuthModalProps {
  children: React.ReactNode
}
export const AuthModal = ({ children }: AuthModalProps) => {
  return (
    <div className="w-full max-w-md p-8 bg-white rounded-3xl shadow-md flex flex-col space-y-4">
      {children}
    </div>
  )
}
