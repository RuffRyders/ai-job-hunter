'use client'

import { formatDistance } from 'date-fns'
import { unarchiveJobApplication } from '../../data/serverActions/unarchiveJobApplication'
import { JobModel } from '../../data/types'

export function ArchivedJobsList({
  jobs,
}: {
  jobs: Pick<JobModel, 'jobTitle' | 'companyName' | 'archivedAt' | 'id'>[]
}) {
  const handleUnarchivePress = (id: string) => async () => {
    await unarchiveJobApplication(id)
  }

  return (
    <ul>
      {jobs?.map((job) => (
        <li className="flex gap-2" key={job.id}>
          <span>
            {job.jobTitle} @ {job.companyName} -{' '}
            {formatDistance(Date.now(), new Date(job.archivedAt as string))}
          </span>
          <button
            type="button"
            onClick={handleUnarchivePress(job.id)}
            className="text-primary-600 underline"
          >
            Unarchive
          </button>
        </li>
      ))}
    </ul>
  )
}
