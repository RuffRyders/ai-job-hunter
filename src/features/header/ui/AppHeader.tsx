'use client'

import { useState } from 'react'

import Avatar from '@/features/header/ui/Avatar'
import { AppLogger } from '@/common/services/Logger/Logger'
import { UserMenu } from './UserMenu'
import { cn } from '@/common/utils/style/cn'

interface AppHeaderProps {
  userData: {
    email: string
    avatarUrl?: string
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
    <div
      className={cn([
        'relative',
        'w-full h-app-header-h-sm md:h-app-header-h-lg',
        'flex flex-row items-center justify-between',
        'bg-white',
        'px-6 py-2',
        'border-b border-b-layout-divider-color',
      ])}
    >
      <div className="font-bold text-lg">Job Assistant</div>
      <div className="relative">
        <Avatar
          className="cursor-pointer"
          onClick={onClickUserAvatar}
          email={userData.email}
          avatarUrl={userData.avatarUrl}
        />

        <div className="absolute right-0 top-app-header-h-lg">
          <UserMenu
            email={userData.email}
            onClose={onCloseUserMenu}
            isOpen={userMenuOpen}
          />
        </div>
      </div>
    </div>
  )
}
