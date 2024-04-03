'use client'

import { Cell, Column, Key, Row } from 'react-aria-components'
import { Table, TableBody, TableHeader } from '@/common/ui/Table'
import { StatusLabel } from '@/common/ui/StatusLabel'
import { applicationStatuses } from '@/features/jobTracker/data/contants/applicationStatuses'
import { useRouter } from 'next/navigation'
import useSWR from 'swr'
import { fetcher } from '@/common/utils/fetcher/fetcher'
import { ApplicationStatus } from '../../data/types'

interface JobApplication {
  jobTitle: string
  companyName: string
  salary: { salaryMin: number; salaryMax: number }
  applicationStatus: string
  updatedAt: string
  [id: string]: any
}

const columns = [
  { name: 'Job Title', id: 'jobTitle', isRowHeader: true },
  { name: 'Company', id: 'companyName' },
  { name: 'Salary', id: 'salary' },
  { name: 'Status', id: 'applicationStatus' },
  { name: 'Last Update', id: 'updatedAt' },
]

// let rows = [
//   {
//     id: 1,
//     jobTitle: 'Software Engineer',
//     companyName: 'Google, Inc.',
//     salary: { salaryMin: 178000, salaryMax: 312000 },
//     applicationStatus: ApplicationStatus.APPLIED,
//     updatedAt: '10/12/23',
//   },
//   {
//     id: 2,
//     jobTitle: 'Software Engineer, Frontend',
//     companyName: 'Nike, Inc.',
//     salary: { salaryMin: 123000, salaryMax: 224000 },
//     applicationStatus: ApplicationStatus.INTERVIEWING,
//     updatedAt: '10/12/23',
//   },
//   {
//     id: '123abc',
//     jobTitle: 'Software Engineer',
//     companyName: 'Google, Inc.',
//     salary: { salaryMin: 178000, salaryMax: 312000 },
//     applicationStatus: ApplicationStatus.NOT_APPLIED,
//     updatedAt: '10/12/23',
//   },
// ] as JobApplication[]

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

function SalaryCell({
  salary,
}: {
  salary: { salaryMin: number; salaryMax: number }
}) {
  return (
    <Cell className="px-6 py-4">
      <span>
        {`${new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          maximumFractionDigits: 0,
        }).format(salary.salaryMin)} - ${new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          maximumFractionDigits: 0,
        }).format(salary.salaryMax)}`}
      </span>
    </Cell>
  )
}

export function JobsTable() {
  const router = useRouter()
  const { data: rows, error } = useSWR('/api/candidate/applications', () =>
    fetcher<JobApplication[]>('/api/candidate/applications'),
  )

  console.log('data', rows)
  console.log('error', error)

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
      <TableBody items={rows}>
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
