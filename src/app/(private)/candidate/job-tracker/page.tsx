import { IconLayoutKanban, IconPlus, IconTable } from '@tabler/icons-react'
import { Button } from '@/common/ui/Button'
import { SearchInput } from '@/common/ui/SearchInput'
import { TabList, Tabs, TabPanel, Tab } from '@/common/ui/Tabs'
import { getJobs } from '@/features/jobTracker/data/api/jobApplications'
import { JobsTable } from '@/features/jobTracker/ui/JobsTable'
import { JobsKanbanBoard } from '@/features/jobTracker/ui/JobsKanbanBoard'
import { JobsFilter } from '@/features/jobTracker/ui/JobsFilter'

export default async function JobTracker({
  searchParams: { filter },
}: {
  searchParams: { filter: string }
}) {
  const { data, error } = await getJobs({ filter })
  if (data === null) {
    return <div> Whoops! An error occurred.</div>
  }

  return (
    <div className="h-full pt-6 mx-auto">
      <div className="h-full flex flex-col gap-2">
        <div className="flex gap-2 items-start items-center px-10">
          <h1 className="text-3xl font-bold">Job Tracker</h1>
          <JobsFilter />
          <Button
            linkProps={{
              href: '/candidate/job-tracker/[id]',
              as: '/candidate/job-tracker/new',
            }}
          >
            <span>Add a job</span>
            <IconPlus size={20} />
          </Button>
        </div>

        <div className="pt-2">
          <Tabs>
            <TabList className="px-10">
              <Tab id="table">
                <div className="flex gap-2 items-center">
                  <IconTable />
                  <span>Table View</span>
                </div>
              </Tab>
              <Tab id="kanban">
                <div className="flex gap-2 items-center">
                  <IconLayoutKanban />
                  <span>Column View</span>
                </div>
              </Tab>
            </TabList>
            <TabPanel id="table">
              <JobsTable jobs={data} />
            </TabPanel>
            <TabPanel id="kanban" className="overflow-x-auto">
              <JobsKanbanBoard jobs={data} />
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
