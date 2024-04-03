'use client'

import { Cell, Column, Key, Row } from 'react-aria-components'
import { Table, TableBody, TableHeader } from '@/common/ui/Table'
import { StatusLabel } from '@/common/ui/StatusLabel'
import { applicationStatuses } from '@/features/jobTracker/data/contants/applicationStatuses'
import { useRouter } from 'next/navigation'
import { ApplicationStatus, JobModel } from '../../data/types'

const columns = [
  { name: 'Job Title', id: 'jobTitle', isRowHeader: true },
  { name: 'Company', id: 'companyName' },
  { name: 'Salary', id: 'salary' },
  { name: 'Status', id: 'applicationStatus' },
  { name: 'Last Update', id: 'updatedAt' },
]

function StatusCell({ status }: { status: ApplicationStatus }) {
  const applicationStatus = applicationStatuses[status]
  if (!applicationStatus) {
    return null
  }
  return (
    <Cell className="px-6 py-4">
      <StatusLabel
        statusText={applicationStatus.name}
        color={applicationStatus.color}
      />
    </Cell>
  )
}

function formatCurrency(value = 0) {
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}

function SalaryCell({
  salary: { salaryMin, salaryMax },
}: {
  salary: { salaryMin?: number; salaryMax?: number }
}) {
  console.log('val type', Boolean(salaryMax))
  return (
    <Cell className="px-6 py-4">
      <span>
        {`${salaryMin ? formatCurrency(salaryMin) : ''} - ${salaryMin ? formatCurrency(salaryMax) : ''}`}
      </span>
    </Cell>
  )
}

interface JobsTableProps {
  jobs: JobModel[]
}

export function JobsTable({ jobs }: JobsTableProps) {
  const router = useRouter()
  // const { data: rows, error } = useSWR('/api/candidate/applications', () =>
  //   fetcher<JobApplication[]>('/api/candidate/applications'),
  // )

  // console.log('data', rows)
  // console.log('error', error)

  const handleRowAction = (key: Key) => {
    console.log('handled key', key)
    if (!key) {
      return
    }

    router.push(`/candidate/job-tracker/${key}`)
  }

  return (
    <Table onRowAction={handleRowAction} aria-label="Jobs Table">
      <TableHeader columns={columns}>
        {(column) => (
          <Column isRowHeader={column.isRowHeader} className="px-6 py-3">
            {({ allowsSorting, sortDirection }) => (
              <>
                {column.name}
                {allowsSorting && (
                  <span aria-hidden="true" className="sort-indicator">
                    {sortDirection === 'ascending' ? '▲' : '▼'}
                  </span>
                )}
              </>
            )}
          </Column>
        )}
      </TableHeader>
      <TableBody items={jobs}>
        {(item) => (
          <Row columns={columns} className="bg-white border-b cursor-pointer">
            {(column) => {
              if (column.id === 'salary') {
                return (
                  <SalaryCell
                    salary={{
                      salaryMax: item['salaryMax'],
                      salaryMin: item['salaryMin'],
                    }}
                  />
                )
              }

              const value = item[column.id]
              if (column.id === 'applicationStatus') {
                return <StatusCell status={value} />
              }
              return <Cell className="px-6 py-4">{value}</Cell>
            }}
          </Row>
        )}
      </TableBody>
    </Table>
  )
}
