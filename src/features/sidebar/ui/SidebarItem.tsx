'use client'

import Image from 'next/image'
import { MenuItem } from 'react-aria-components'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import { cn } from '@/common/utils/style/cn'

interface SidebarItemProps {
  id: string
  displayName: string
  icon: StaticImport
  expanded: boolean
  className?: string
}

export const SidebarItem = ({
  id,
  displayName,
  icon,
  expanded,
  className,
}: SidebarItemProps) => {
  return (
    <MenuItem
      className={cn([
        'relative',
        'py-2',
        'hover:bg-gray-200 cursor-pointer focus:outline-none',
        'flex flex-row',
        'justify-start',
        'items-center',
        'overflow-hidden',
        className,
      ])}
      id={id}
      textValue={displayName}
    >
      <div className="w-sidebar-w-closed min-w-sidebar-w-closed flex flex-row justify-center items-center">
        <Image
          className="aspect-square h-8 w-8"
          alt={`${displayName}-icon`}
          src={icon}
        />
      </div>

      <p className={cn(['whitespace-nowrap'])}>{displayName}</p>
    </MenuItem>
  )
}
