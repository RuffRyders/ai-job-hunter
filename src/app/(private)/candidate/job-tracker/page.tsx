import { Button } from '@/common/ui/Button'
import { SearchInput } from '@/common/ui/SearchInput'
import { TabList, Tabs } from '@/common/ui/Tabs'
import { TabPanel } from '@/common/ui/Tabs/components'
import { Tab } from '@/common/ui/Tabs/components/Tab'
import { getJobs } from '@/features/jobTracker/data/api/jobApplications'
import { JobsKanbanView } from '@/features/jobTracker/ui/JobsKanbanView'
import { JobsTable } from '@/features/jobTracker/ui/JobsTable'
import { IconLayoutKanban, IconTable } from '@tabler/icons-react'

export default async function JobTracker() {
  const { data, error } = await getJobs()
  if (data === null) {
    return <div> Whoops! An error occurred.</div>
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
          <Tabs>
            <TabList>
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
            <TabPanel id="kanban">
              <JobsKanbanView
                containerStyle={
                  {
                    // maxHeight: '80vh',
                  }
                }
                itemCount={15}
                scrollable
              />
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
