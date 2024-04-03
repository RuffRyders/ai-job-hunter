'use client'

import { MenuItem } from 'react-aria-components'

interface SidebarItemProps {
  id: string
  displayName: string
}

export const SidebarItem = ({ id, displayName }: SidebarItemProps) => {
  return (
    <MenuItem id={id} textValue={displayName}>
      {displayName}
    </MenuItem>
  )
}
