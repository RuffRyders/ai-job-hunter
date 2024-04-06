'use client'

import { Menu } from 'react-aria-components'

import { SidebarItem } from './SidebarItem'
import { cn } from '@/common/utils/style/cn'
import SidebarItemConfig from '../data/config'
import React from 'react'
import { usePathname } from 'next/navigation'

export const Sidebar = () => {
  // const [open, setOpen] = useState(false)
  const currentPath = usePathname()

  return (
    <div
      className="h-full w-sidebar-w-closed relative z-50"
      // onMouseEnter={() => setOpen(true)}
      // onMouseLeave={() => setOpen(false)}
    >
      <Menu
        className={cn([
          'absolute',
          'h-full',
          'w-sidebar-w-closed',
          'hover:w-sidebar-w-open',
          'transition-width',
          'ease-out',
          'duration-200',
          'bg-sidebar-bg-light dark:bg-sidebar-bg-dark',
          'border-r',
          'border-layout-divider-color',
          'z-100',
        ])}
        aria-label="Sidebar"
      >
        {SidebarItemConfig.map((item) => (
          <SidebarItem
            key={item.id}
            Icon={item.Icon}
            id={item.id}
            displayName={item.displayName}
            path={item.path}
            currentPath={currentPath}
            // open={open}
          />
        ))}
      </Menu>
    </div>
  )
}
