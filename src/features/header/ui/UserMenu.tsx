'use client'

import { useEffect, useRef, useState } from 'react'

import { signOut } from '@/features/auth/serverActions/signOut'
import { AvatarImage } from './AvatarImage'
import LoadingOverlay from '@/common/ui/LoadingOverlay'

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
      className="absolute top-full right-0 py-1 bg-gray-100 shadow-lg rounded-md border border-gray-200 z-50"
    >
      <div className="flex flex-col">
        <div className="p-2 text-sm font-bold">{userData.email}</div>
        <div className="border-b border-gray-200 relative">
          <AvatarImage avatarUrl={userData.avatarUrl} email={userData.email} />
        </div>
      </div>

      <ul>
        <UserMenuItem onClick={handleSettings} onKeyDown={handleKeyDown}>
          Settings
        </UserMenuItem>
        <UserMenuItem onClick={handleSignOut} onKeyDown={handleKeyDown}>
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
}

const UserMenuItem = ({ children, onClick, onKeyDown }: UserMenuItemProps) => {
  return (
    <li
      className="hover:bg-gray-100 cursor-pointer p-2 pl-6 focus:outline-none focus:bg-gray-200"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      {children}
    </li>
  )
}
