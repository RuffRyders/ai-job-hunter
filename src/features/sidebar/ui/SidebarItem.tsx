'use client'

import { MenuItem } from 'react-aria-components'
import { cn } from '@/common/utils/style/cn'
import { SVGComponent } from '@/common/ui/IconsSVG/types'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface SidebarItemProps {
  id: string
  displayName: string
  Icon: SVGComponent
  className?: string
  path: string
  currentPath?: string
  // open: boolean
}

export const SidebarItem = ({
  id,
  displayName,
  Icon,
  className,
  path,
  currentPath,
  // open,
}: SidebarItemProps) => {
  const router = useRouter()

  const [hovered, setHovered] = useState(false)
  const isCurrentPath = currentPath?.startsWith(path)

  return (
    <MenuItem
      className={cn([
        'relative',
        'cursor-pointer focus:outline-none',
        isCurrentPath
          ? 'bg-sidebar-item-bg-light-selected'
          : 'hover:bg-sidebar-item-bg-light-selected hover:bg-opacity-50',
        isCurrentPath
          ? 'sidebar-item-text-light-selected'
          : 'text-sidebar-item-text-light hover:text-sidebar-item-text-light-hover',
        'overflow-hidden',
        'flex flex-col',
        className,
      ])}
      id={id}
      textValue={displayName}
    >
      <Link
        prefetch={false}
        href={path}
        // prefetch on hover
        // https://stackoverflow.com/questions/77921256/next-js-how-to-prefetch-links-on-hover-instead-of-initial-render
        onMouseEnter={() => {
          setHovered(true)
          router.prefetch(path)
        }}
        onMouseLeave={() => setHovered(false)}
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
            <Icon
              className={cn([
                'h-8 w-8',
                isCurrentPath
                  ? 'fill-sidebar-item-icon-light-selected'
                  : 'fill-current',
              ])}
            />
          </div>

          <p
            className={cn([
              'whitespace-nowrap',
              'text-sm font-medium',
              hovered
                ? 'text-sidebar-item-text-light-hover'
                : 'text-sidebar-item-text-light',
            ])}
          >
            {displayName}
          </p>
        </div>
        {/* if we want borders between items later */}
        {/* {open && <div className="h-[1px] bg-gray-300 mx-4" />} */}
      </Link>
    </MenuItem>
  )
}
