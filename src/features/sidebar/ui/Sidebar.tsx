'use client'

import { Menu } from 'react-aria-components'
import { SidebarItem } from './SidebarItem'

export const Sidebar = () => {
  return (
    <Menu
      className="h-full w-20 bg-slate-100"
      aria-label="Sidebar"
      onAction={alert}
    >
      <SidebarItem id="profile" displayName="Profile" />
      <SidebarItem id="jobs" displayName="Jobs" />
      <SidebarItem id="resumeStudio" displayName="Resume Studio" />
    </Menu>
  )
}
