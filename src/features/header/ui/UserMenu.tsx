'use client'

import { useEffect, useRef, useState } from 'react'

import { signOut } from '@/features/auth/serverActions/signOut'
import LoadingOverlay from '@/common/ui/LoadingOverlay'
import { cn } from '@/common/utils/style/cn'
import { Key, Menu, MenuItem } from 'react-aria-components'

const PADDING_X = 'px-6'

interface UserMenuProps {
  isOpen: boolean
  onClose: () => void
  email: string
}

export const UserMenu = ({ isOpen, onClose, email }: UserMenuProps) => {
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

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape' && isOpen) {
      onClose()
    }
  }

  const handleAction = async (action: Key) => {
    if (action === 'settings') {
      handleSettings()
    } else if (action === 'signout') {
      await handleSignOut()
    }
    onClose()
  }

  if (!isOpen) {
    return null
  }

  return (
    <div
      onKeyDown={handleKeyDown}
      ref={menuRef}
      className="bg-gray-100 w-56 overflow-hidden shadow-lg rounded-md border border-gray-200 z-50"
    >
      <div
        className={cn(
          'flex flex-col py-4 border-slate-300 border-b-[1px] space-y-2',
          PADDING_X,
        )}
      >
        <div className="text-sm font-bold truncate">{email}</div>
      </div>

      <Menu aria-label="User Menu" onAction={handleAction}>
        <UserMenuItem id="settings" className={PADDING_X}>
          Settings
        </UserMenuItem>
        <UserMenuItem id="signout" className={PADDING_X}>
          Log out
        </UserMenuItem>
      </Menu>

      <LoadingOverlay loading={loading} displayText="Signing out..." />
    </div>
  )
}

interface UserMenuItemProps {
  children: React.ReactNode
  className?: string
  id: string
}

const UserMenuItem = ({ children, id, className }: UserMenuItemProps) => {
  return (
    <MenuItem
      aria-label={`Menu Item - ${id}`}
      id={id}
      className={cn(
        'hover:bg-gray-200 cursor-pointer p-2 focus:outline-none focus:bg-gray-200',
        className,
      )}
    >
      {children}
    </MenuItem>
  )
}
