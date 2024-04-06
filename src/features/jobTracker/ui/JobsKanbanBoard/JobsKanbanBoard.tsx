'use client'

import { KanbanBoard } from '@/common/ui/KanbanBoard'
import { JobModel } from '../../data/types'
import { CSSProperties } from 'react'

const columns = {
  NOT_APPLIED: 'Saved',
  APPLIED: 'Applied',
  INTERVIEWING: 'Interviewing',
  OFFERED: 'Offered',
} as { [key: string]: string }

const containerStyle = {
  // TODO: Replace magic number math with flexbox solution
  height: 'calc(100vh - 220px)',
  flex: 1,
  overflowX: 'auto',
} as CSSProperties

interface JobsKanbanBoardProps {
  jobs?: JobModel[]
}

export function JobsKanbanBoard({ jobs }: JobsKanbanBoardProps) {
  // TODO: build items from jobs
  // TODO: build renderIttemContents callback
  // TODO: build renderColumnHeader callback

  return (
    <KanbanBoard
      containerStyle={containerStyle}
      itemCount={15}
      items={{
        NOT_APPLIED: ['one', 'two', 'three'],
        APPLIED: ['four', 'five', 'six', 'seven'],
        INTERVIEWING: ['eight', 'nine', 'ten', 'eleven'],
        OFFERED: [],
      }}
      scrollable
      // onDropItem={({ item, column }) => {}}
      renderColumnHeader={(columnKey) => <span>{columns[columnKey]}</span>}
      renderItemContents={(value) => {
        return <div>Custom {value}</div>
      }}
    />
  )
}
