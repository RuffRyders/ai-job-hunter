'use client'

import { useEffect, useRef, useState } from 'react'

import { signOut } from '@/features/auth/serverActions/signOut'
import { AvatarImage } from './AvatarImage'
import LoadingOverlay from '@/common/ui/LoadingOverlay'
import { cn } from '@/common/utils/style/cn'

const PADDING_RIGHT = 'pr-6'
const PADDING_LEFT = 'pl-6'

interface UserMenuProps {
  isOpen: boolean
  onClose: () => void
  userData: {
    email: string
    avatarUrl: string
  }
}

export const UserMenu = ({ isOpen, onClose, userData }: UserMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(false)

  const handleSignOut = async () => {
    setLoading(true)
    try {
      const response = await signOut()
      if (response?.error) throw new Error(response.error.message)
    } catch (err) {
      console.log('Error signing out: ', err)
      alert('Error signing out. Please try again.')
    }
    setLoading(false)
  }

  const handleSettings = () => {
    console.log('Navigating to settings.')
    alert('TODO: Navigate to settings.')
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    // Only add the listener if the menu is open
    if (isOpen) {
      document.addEventListener('click', handleClickOutside)
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isOpen, onClose])

  useEffect(() => {
    if (isOpen) {
      // Focus the first item when the menu opens
      menuRef.current?.querySelector('li')?.focus()
    }
  }, [isOpen])

  const handleKeyDown = (event: React.KeyboardEvent) => {
    const currentFocus = document.activeElement as HTMLElement

    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault() // Prevent page scrolling
      if (event.key === 'ArrowDown') {
        ;(currentFocus.nextElementSibling as HTMLElement)?.focus()
      } else {
        ;(currentFocus.previousElementSibling as HTMLElement)?.focus()
      }
    } else if (event.key === 'Enter') {
      // Simulate click on the currently focused element
      currentFocus.click()
    } else if (event.key === 'Escape') {
      onClose()
    }
  }

  if (!isOpen) {
    return null
  }

  return (
    <div
      ref={menuRef}
      className="bg-gray-100 w-56 overflow-hidden shadow-lg rounded-md border border-gray-200 z-50"
    >
      <div
        className={cn(
          'flex flex-col py-4 border-slate-300 border-b-[1px] space-y-2',
          PADDING_LEFT,
          PADDING_RIGHT,
        )}
      >
        {/* <div className="border-b h-8 w-8 relative">
          <AvatarImage avatarUrl={userData.avatarUrl} email={userData.email} />
        </div> */}
        <div className="text-sm font-bold truncate">{userData.email}</div>
      </div>

      <ul>
        <UserMenuItem
          className={cn(PADDING_LEFT, PADDING_RIGHT)}
          onClick={handleSettings}
          onKeyDown={handleKeyDown}
        >
          Settings
        </UserMenuItem>
        <UserMenuItem
          className={cn(PADDING_LEFT, PADDING_RIGHT)}
          onClick={handleSignOut}
          onKeyDown={handleKeyDown}
        >
          Log out
        </UserMenuItem>
      </ul>

      <LoadingOverlay loading={loading} displayText="Signing out..." />
    </div>
  )
}

interface UserMenuItemProps {
  children: React.ReactNode
  onClick: () => void
  onKeyDown: (event: React.KeyboardEvent) => void
  className?: string
}

const UserMenuItem = ({
  children,
  onClick,
  onKeyDown,
  className,
}: UserMenuItemProps) => {
  return (
    <li
      className={cn(
        'hover:bg-gray-200 cursor-pointer p-2 focus:outline-none focus:bg-gray-200',
        className,
      )}
      tabIndex={0}
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      {children}
    </li>
  )
}
