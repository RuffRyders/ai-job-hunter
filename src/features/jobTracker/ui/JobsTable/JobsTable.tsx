'use client'

import { Cell, Column, Key, Row } from 'react-aria-components'
import { Table, TableBody, TableHeader } from '@/common/ui/Table'
import { StatusLabel } from '@/common/ui/StatusLabel'
import { applicationStatuses } from '@/features/jobTracker/data/contants/applicationStatuses'
import { useRouter } from 'next/navigation'
import { ApplicationStatus, JobModel } from '../../data/types'
import { formatDistance } from 'date-fns'
import { Database } from '@/common/services/supabase/database.types'
import { JOB_TRACKER_BASEURL } from '../../data/contants/routes'

const columns = [
  { name: 'Job Title', id: 'jobTitle', isRowHeader: true },
  { name: 'Company', id: 'companyName' },
  { name: 'Salary', id: 'salary' },
  { name: 'Status', id: 'applicationStatus' },
  { name: 'Last Update', id: 'updatedAt' },
]

function StatusCell({ status }: { status?: ApplicationStatus | null }) {
  if (!status) {
    return null
  }
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
  return new Intl.NumberFormat('en-US', {
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
  jobs?: JobModel[]
}

export function JobsTable({ jobs }: JobsTableProps) {
  const router = useRouter()

  const handleRowAction = (key: Key) => {
    console.log('handled key', key)
    if (!key) {
      return
    }

    router.push(`${JOB_TRACKER_BASEURL}/${key}`)
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
        {(item: Database['public']['Tables']['jobApplications']['Row']) => (
          <Row
            columns={columns}
            className="bg-white border-b cursor-pointer hover:bg-gray-100"
          >
            {(column) => {
              if (column.id === 'salary') {
                return (
                  <SalaryCell
                    salary={{
                      salaryMax: item['salaryMax'] as any,
                      salaryMin: item['salaryMin'] as any,
                    }}
                  />
                )
              }

              const value =
                item[
                  column.id as keyof Database['public']['Tables']['jobApplications']['Row']
                ]
              if (column.id === 'applicationStatus') {
                return <StatusCell status={value as any} />
              }
              if (column.id === 'updatedAt') {
                return (
                  <Cell className="px-6 py-4">
                    {value && `${formatDistance(Date.now(), value)} ago`}
                  </Cell>
                )
              }
              return <Cell className="px-6 py-4">{value}</Cell>
            }}
          </Row>
        )}
      </TableBody>
    </Table>
  )
}
