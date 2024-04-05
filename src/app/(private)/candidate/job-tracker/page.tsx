import { Button } from '@/common/ui/Button'
import { SearchInput } from '@/common/ui/SearchInput'
import { TabList, Tabs } from '@/common/ui/Tabs'
import { TabPanel } from '@/common/ui/Tabs/components'
import { Tab } from '@/common/ui/Tabs/components/Tab'
import { getJobs } from '@/features/jobTracker/data/api/jobApplications'
import { KanbanBoard } from '@/common/ui/KanbanBoard'
import { JobsTable } from '@/features/jobTracker/ui/JobsTable'
import { IconLayoutKanban, IconPlus, IconTable } from '@tabler/icons-react'
import { KanbanRenderItemProps } from '@/common/ui/KanbanBoard/components/Item/Item'
import { JobsKanbanBoard, KanbanItem } from './_components/JobsKanbanBoard'

export default async function JobTracker() {
  const { data, error } = await getJobs()
  if (data === null) {
    return <div> Whoops! An error occurred.</div>
  }

  return (
    <div className="h-full pt-6 mx-auto">
      <div className="h-full flex flex-col gap-2">
        <div className="flex gap-2 items-start items-center px-10">
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
              <JobsKanbanBoard />
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
