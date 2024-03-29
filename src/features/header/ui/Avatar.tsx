import Image from 'next/image'

interface AvatarProps {
  email: string
  avatarUrl?: string
}

export default function Avatar({ email, avatarUrl }: AvatarProps) {
  return (
    <div className="h-full aspect-square bg-purple-400 rounded-full">
      {avatarUrl ? (
        <Image
          src={avatarUrl}
          alt={email}
          className="h-full w-full object-cover rounded-full"
        />
      ) : (
        <div className="h-full w-full flex items-center justify-center text-white text-xl">
          {email[0].toUpperCase()}
        </div>
      )}
    </div>
  )
}
