'use client'

import { KanbanBoard } from '@/common/ui/KanbanBoard'
import { ApplicationStatus, JobModel } from '../../data/types'
import { CSSProperties, useCallback, useMemo } from 'react'
import { UniqueIdentifier } from '@dnd-kit/core'
import { useRouter } from 'next/navigation'
import { JOB_TRACKER_BASEURL } from '../../data/contants/routes'
import { updateJob } from '../../data/api/jobApplications'
import { updateJobApplication } from '../../data/serverActions/updateJobApplication'

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
  console.log('jobs', jobs)
  const router = useRouter()

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

  const renderItemContent = useCallback(
    (itemKey: UniqueIdentifier) => {
      const job = jobs?.find((job) => job.id === itemKey)
      return (
        <div className="flex flex-col gap">
          <div className="">{job?.jobTitle}</div>
          <div className="font-bold text-xs">{job?.companyName}</div>
        </div>
      )
    },
    [jobs],
  )

  const onItemClick = useCallback(
    (itemKey: UniqueIdentifier) => {
      if (!itemKey) {
        return
      }

      router.push(`${JOB_TRACKER_BASEURL}/${itemKey}`)
    },
    [router],
  )

  const onItemMove = useCallback(
    (itemKey: UniqueIdentifier, applicationStatus: UniqueIdentifier) => {
      console.log('on item move', itemKey, applicationStatus)
      // TODO: Set the lexorank on the item
      updateJobApplication(itemKey as string, {
        applicationStatus: applicationStatus as ApplicationStatus,
      })
    },
    [],
  )

  console.log('items', items)

  return (
    <KanbanBoard
      containerStyle={containerStyle}
      items={items}
      scrollable
      onItemMove={onItemMove}
      onItemClick={onItemClick}
      renderColumnHeader={renderColumnHeader}
      renderItemContents={renderItemContent}
    />
  )
}
