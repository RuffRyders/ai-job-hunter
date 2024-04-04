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
      className="h-full w-sidebar-w-closed relative"
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
          'bg-sidebar-light dark:bg-sidebar-dark',
          'text-black dark:text-white',
          'border-r',
          'border-layout-divider-color',
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
