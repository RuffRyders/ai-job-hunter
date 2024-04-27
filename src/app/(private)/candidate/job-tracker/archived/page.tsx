import Link from 'next/link'
import { IconArrowLeft } from '@tabler/icons-react'
import { JOB_TRACKER_BASEURL } from '@/features/jobTracker/data/contants/routes'
import { ArchivedJobsList } from '@/features/jobTracker/ui/ArchivedJobsList'
import { getJobs } from '@/features/jobTracker/data/api/jobApplications'

export default async function ArchivedJobsPage() {
  const { data, error } = await getJobs({
    isArchived: true,
    fields: ['jobTitle', 'companyName', 'id', 'archivedAt'],
  })
  console.log(data)
  return (
    <div className="flex flex-col gap-4 p-10">
      <Link
        className="flex gap-2 items-center text-sm"
        href={JOB_TRACKER_BASEURL}
      >
        <IconArrowLeft size={20} /> Back to Job Tracker
      </Link>
      <h1 className="text-3xl font-bold">Archived Jobs</h1>
      {data ? <ArchivedJobsList jobs={data} /> : <div>Nothing archived.</div>}
    </div>
  )
}
