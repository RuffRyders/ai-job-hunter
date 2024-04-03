'use client'

import { useState } from 'react'

import Avatar from '@/features/header/ui/Avatar'
import { AppLogger } from '@/common/services/Logger/Logger'
import { UserMenu } from './UserMenu'

interface AppHeaderProps {
  userData: {
    email: string
    avatarUrl: string
  }
}

export default function AppHeader({ userData }: AppHeaderProps) {
  AppLogger.debug('AppHeader: render')

  const [userMenuOpen, setUserMenuOpen] = useState(false)

  const onClickUserAvatar = () => {
    setUserMenuOpen(!userMenuOpen)
  }

  const onCloseUserMenu = () => {
    setUserMenuOpen(false)
  }

  return (
    <div className="relative w-full h-16 sm:h-18 bg-white border-b-[1px] border-b-gray-300 flex flex-row items-center justify-between px-6 py-3">
      <div className="font-bold text-lg">Job Assistant</div>

      {userData && (
        <Avatar
          className="cursor-pointer"
          onClick={onClickUserAvatar}
          email={userData.email}
          avatarUrl={userData.avatarUrl}
        />
      )}

      <div className="absolute right-0 bottom-0">
        <UserMenu
          userData={userData}
          onClose={onCloseUserMenu}
          isOpen={userMenuOpen}
        />
      </div>
    </div>
  )
}
