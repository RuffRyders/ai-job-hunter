'use client'

import { signOut } from '@/features/auth/serverActions/signOut'
import { useEffect, useRef } from 'react'

interface UserMenuProps {
  isOpen: boolean
  onClose: () => void
}

export const UserMenu = ({ isOpen, onClose }: UserMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null)

  const handleSignOut = async () => {
    try {
      const response = await signOut()
      if (response?.error) throw new Error(response.error.message)
    } catch (err) {
      console.log('Error signing out: ', err)
      alert('Error signing out. Please try again.')
    }
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
      className="absolute top-full right-0 py-1 w-48 bg-gray-100 shadow-lg rounded-md border border-gray-200 z-50"
    >
      <ul>
        <li
          className="hover:bg-gray-100 cursor-pointer p-2 focus:outline-none focus:bg-gray-200"
          tabIndex={0}
          onClick={handleSettings}
          onKeyDown={handleKeyDown}
        >
          Settings
        </li>
        <li
          className="hover:bg-gray-100 cursor-pointer p-2 focus:outline-none focus:bg-gray-200"
          tabIndex={0}
          onClick={handleSignOut}
          onKeyDown={handleKeyDown}
        >
          Log out
        </li>
      </ul>
    </div>
  )
}
