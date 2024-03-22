import { Button } from '@/components/Button'
import { SearchInput } from '@/components/SearchInput'
import { Table } from '@/components/Table'

export default function JobTracker() {
  return (
    <div className="max-w-5xl h-full p-6 container mx-auto">
      <div className="h-full flex flex-col gap-2">
        <div className="flex gap-2 items-start items-center">
          <h1 className="text-3xl font-bold">Job Tracker</h1>
          <SearchInput className="ml-auto" placeholder="Search..." />
          <Button>Add a job</Button>
        </div>

        <div className="py-4">
          <Table />
        </div>
      </div>
    </div>
  )
}
