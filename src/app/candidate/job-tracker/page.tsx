import { Button } from '@/common/ui/Button'
import { SearchInput } from '@/common/ui/SearchInput'
import { getUserOrServerRedirect } from '@/common/utils/auth/getUserOrServerRedirect'
import { JobsTable } from '@/features/jobTracker/ui/JobsTable'
import Link from 'next/link'

export default async function JobTracker() {
  // Protect route to ensure a user is signed in
  await getUserOrServerRedirect()

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
          <Link
            href="/candidate/job-tracker/[id]"
            as="/candidate/job-tracker/new"
          >
            <Button>Add a job</Button>
          </Link>
        </div>

        <div className="py-4">
          <JobsTable />
        </div>
      </div>
    </div>
  )
}
