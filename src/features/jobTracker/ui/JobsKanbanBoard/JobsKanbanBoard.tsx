'use client'

import { KanbanBoard } from '@/common/ui/KanbanBoard'
import { ApplicationStatus, JobModel } from '../../data/types'
import { CSSProperties, useCallback, useMemo } from 'react'
import { UniqueIdentifier } from '@dnd-kit/core'

const columns = {
  NOT_APPLIED: 'Saved',
  APPLIED: 'Applied',
  INTERVIEWING: 'Interviewing',
  OFFER_PENDING: 'Offered',
} as { [key: string]: string }

const containerStyle = {
  // TODO: Replace magic number math with flexbox solution
  height: 'calc(100vh - 220px)',
  flex: 1,
  overflowX: 'auto',
} as CSSProperties

interface JobsKanbanBoardProps {
  jobs?: JobModel[]
}

export function JobsKanbanBoard({ jobs }: JobsKanbanBoardProps) {
  // build and memoize items from jobs
  const items = useMemo(
    () =>
      jobs?.reduce(
        (acc, job) => {
          if (acc[job.applicationStatus]) {
            acc[job.applicationStatus].push(job.id)
          } else {
            acc[job.applicationStatus] = [job.id]
          }
          return acc
        },
        {
          NOT_APPLIED: [] as UniqueIdentifier[],
          APPLIED: [] as UniqueIdentifier[],
          INTERVIEWING: [] as UniqueIdentifier[],
          OFFER_PENDING: [] as UniqueIdentifier[],
        } as Record<ApplicationStatus, UniqueIdentifier[]>,
      ),
    [jobs],
  )

  const renderColumnHeader = useCallback(
    (columnKey: ApplicationStatus) => <span>{columns[columnKey]}</span>,
    [],
  )

  const renderItemContent = useCallback((itemKey: UniqueIdentifier) => {
    return <div>Custom {itemKey}</div>
  }, [])

  return (
    <KanbanBoard
      containerStyle={containerStyle}
      itemCount={15}
      items={items}
      scrollable
      // onItemMove={({ item, column }) => { /* update database */ }}
      // onItemClick={(itemKey: UniqueIdentifier) => { /* open model */ }}
      renderColumnHeader={renderColumnHeader}
      renderItemContents={renderItemContent}
    />
  )
}
