'use client'

import { MenuItem } from 'react-aria-components'
import { cn } from '@/common/utils/style/cn'
import { SVGComponent } from '@/common/ui/IconsSVG/types'

interface SidebarItemProps {
  id: string
  displayName: string
  Icon: SVGComponent
  className?: string
  // open: boolean
}

export const SidebarItem = ({
  id,
  displayName,
  Icon,
  className,
  // open,
}: SidebarItemProps) => {
  return (
    <MenuItem
      className={cn([
        'relative',
        'hover:bg-gray-200 cursor-pointer focus:outline-none',
        'overflow-hidden',
        'flex flex-col',
        className,
      ])}
      id={id}
      textValue={displayName}
    >
      <div
        className={cn([
          'flex flex-row',
          'justify-start',
          'items-center',
          'py-2',
        ])}
      >
        <div className="w-sidebar-w-closed min-w-sidebar-w-closed flex flex-row justify-center items-center">
          <Icon className="h-8 w-8 fill-black dark:fill-gray-300" />
        </div>

        <p className={cn(['whitespace-nowrap'])}>{displayName}</p>
      </div>
      {/* if we want borders between items later */}
      {/* {open && <div className="h-[1px] bg-gray-300 mx-4" />} */}
    </MenuItem>
  )
}
