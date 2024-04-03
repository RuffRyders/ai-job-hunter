'use client'

import { MouseEvent, useEffect, useState } from 'react'

import Avatar from '@/features/header/ui/Avatar'
import fetchUserData from '@/features/header/data/fetchUserData'
import { AppLogger } from '@/common/services/Logger/Logger'
import { UserMenu } from './UserMenu'
import { getErrorMessage } from '@/common/utils/getErrorMessage/getErrorMessage'

export default function AppHeader() {
  AppLogger.debug('AppHeader: render')

  const [userData, setUserData] = useState<{
    email: string
    avatarUrl: string
  } | null>(null)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  const onClickUserAvatar = () => {
    setUserMenuOpen(!userMenuOpen)
  }

  const onCloseUserMenu = () => {
    setUserMenuOpen(false)
  }

  useEffect(() => {
    ;(async () => {
      try {
        const { data, error } = await fetchUserData()
        if (error) throw new Error(error)
        if (!data) throw new Error('No data returned')

        setUserData(data)
      } catch (err) {
        const errMessage = getErrorMessage(err)

        console.log('Error fetching user data: ', errMessage)
        setUserData(null)
      }
    })()
  }, [])

  return (
    <div className="relative w-full h-16 sm:h-18 bg-white border-b-[1px] border-b-gray-300 flex flex-row items-center justify-between px-6 py-3">
      <div className="font-bold text-lg">branding here</div>

      {userData && (
        <Avatar
          className="cursor-pointer"
          onClick={onClickUserAvatar}
          email={userData.email}
          avatarUrl={userData.avatarUrl}
        />
      )}

      {!userData && <div className="text-red-500">X</div>}

      <div className="absolute right-0 bottom-0">
        <UserMenu onClose={onCloseUserMenu} isOpen={userMenuOpen} />
      </div>
    </div>
  )
}
