'use client'

import { JobModel } from '@/features/jobTracker/data/types'
import { Control, useWatch } from 'react-hook-form'

export function JobTitleWatched({ control }: { control: Control<JobModel> }) {
  const jobTitle = useWatch({
    control,
    name: 'jobTitle',
    defaultValue: 'Job Title',
  })
  return <div className="font-bold">{jobTitle || 'Job Title'}</div>
}
