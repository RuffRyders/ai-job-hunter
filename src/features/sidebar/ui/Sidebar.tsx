'use client'

import { useState } from 'react'
import { Menu } from 'react-aria-components'

import { SidebarItem } from './SidebarItem'
import { cn } from '@/common/utils/style/cn'

import ListIcon from '../../../../public/icons/list.svg'
import PersonIcon from '../../../../public/icons/person.svg'
import DocumentIcon from '../../../../public/icons/document.svg'

export const Sidebar = () => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="h-full w-sidebar-w-closed z-50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Menu
        className={cn([
          'absolute',
          'h-full',
          'w-sidebar-w-closed',
          'hover:w-sidebar-w-open',
          'transition-width',
          'ease-in-out',
          'duration-300',
          'bg-slate-100',
          'border-r',
          'border-layout-divider-color'
        ])}
        aria-label="Sidebar"
        onAction={alert}
      >
        <SidebarItem
          icon={PersonIcon}
          id="profile"
          displayName="Profile"
          expanded={isHovered}
        />
        <SidebarItem
          icon={ListIcon}
          id="jobs"
          displayName="Jobs"
          expanded={isHovered}
        />
        <SidebarItem
          icon={DocumentIcon}
          id="resumeStudio"
          displayName="Resume Studio"
          expanded={isHovered}
        />
      </Menu>
    </div>
  )
}
