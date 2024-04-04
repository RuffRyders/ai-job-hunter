'use client'

import { MenuItem } from 'react-aria-components'
import { cn } from '@/common/utils/style/cn'
import { SVGComponent } from '@/common/ui/IconsSVG/types'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

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

  const isCurrentPath = currentPath?.startsWith(path)

  return (
    <MenuItem
      className={cn([
        'relative',
        'hover:bg-gray-200 text-gray-500 hover:text-black cursor-pointer focus:outline-none',
        isCurrentPath ? 'bg-gray-200' : '',
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
        onMouseEnter={() => router.prefetch(path)}
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
              strokeWidth={'10px'}
              className={cn([
                'h-8 w-8 fill-current',
                isCurrentPath ? 'text-black' : '',
              ])}
            />
          </div>

          <p className={cn(['whitespace-nowrap', 'text-sm font-medium'])}>
            {displayName}
          </p>
        </div>
        {/* if we want borders between items later */}
        {/* {open && <div className="h-[1px] bg-gray-300 mx-4" />} */}
      </Link>
    </MenuItem>
  )
}
