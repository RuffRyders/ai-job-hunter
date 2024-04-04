import { Button } from '@/common/ui/Button'
import { SearchInput } from '@/common/ui/SearchInput'
import { TabList, Tabs } from '@/common/ui/Tabs'
import { TabPanel } from '@/common/ui/Tabs/components'
import { Tab } from '@/common/ui/Tabs/components/Tab'
import { getJobs } from '@/features/jobTracker/data/api/jobApplications'
import { KanbanBoard } from '@/common/ui/KanbanBoard'
import { JobsTable } from '@/features/jobTracker/ui/JobsTable'
import { IconLayoutKanban, IconTable } from '@tabler/icons-react'

export default async function JobTracker() {
  const { data, error } = await getJobs()
  if (data === null) {
    return <div> Whoops! An error occurred.</div>
  }

  return (
    <div className="h-full pt-6 mx-auto">
      <div className="h-full flex flex-col gap-2">
        <div className="flex gap-2 items-start items-center px-6">
          <h1 className="text-3xl font-bold">Job Tracker</h1>
          <SearchInput
            className="ml-auto"
            placeholder="Filter..."
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

        <div className="pt-2">
          <Tabs>
            <TabList className="px-6">
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
              <KanbanBoard
                containerStyle={{
                  // TODO: Replace magic number math with flexbox solution
                  maxHeight: 'calc(100vh - 154px)',
                  flex: 1,
                  overflowX: 'auto',
                }}
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
