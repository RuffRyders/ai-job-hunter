'use client'

import { SearchInput } from '@/common/ui/SearchInput'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

export function JobsFilter() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const setValueInQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams],
  )

  const handleSubmit = useCallback(
    (value: string) => {
      router.push(pathname + '?' + setValueInQueryString('filter', value))
    },
    [setValueInQueryString, pathname, router],
  )

  const handleClear = useCallback(() => {
    router.push(pathname + '?' + setValueInQueryString('filter', ''))
  }, [setValueInQueryString, pathname, router])

  const searchValue = searchParams.get('filter') || undefined

  return (
    <SearchInput
      className="ml-auto"
      placeholder="Filter..."
      aria-label="Filter applied jobs"
      value={searchValue}
      onSubmit={handleSubmit}
      onClear={handleClear}
    />
  )
}
