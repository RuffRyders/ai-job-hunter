import { Button } from '@/common/ui/Button'
import { SearchInput } from '@/common/ui/SearchInput'
import { getJobs } from '@/features/jobTracker/data/api/jobApplications'
import { JobsTable } from '@/features/jobTracker/ui/JobsTable'
import Link from 'next/link'

export default async function JobTracker() {
  const { data, error } = await getJobs()
  if (data === null) {
    return <div> Whoops! An error occured.</div>
  }

  return (
    <div className="max-w-5xl h-full p-6 container mx-auto">
      <div className="h-full flex flex-col gap-2">
        <div className="flex gap-2 items-start items-center">
          <h1 className="text-3xl font-bold">Job Tracker</h1>
          <SearchInput
            className="ml-auto"
            placeholder="Search..."
            aria-label="Filter applied jobs"
          />

          <Button
            linkProps={{
              href: '/candidate/job-tracker/[id]',
              as: '/candidate/job-tracker/new',
            }}
          >
            Add a job
          </Button>
        </div>

        <div className="py-4">
          <JobsTable jobs={data} />
        </div>
      </div>
    </div>
  )
}
