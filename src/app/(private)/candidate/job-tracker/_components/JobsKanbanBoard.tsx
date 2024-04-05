'use client'

import { KanbanBoard } from '@/common/ui/KanbanBoard'
import { KanbanRenderItemProps } from '@/common/ui/KanbanBoard/components/Item/Item'
import { cn } from '@/common/utils/style/cn'

const columns = {
  NOT_APPLIED: 'Saved',
  APPLIED: 'Applied',
  INTERVIEWING: 'Interviewing',
  OFFERED: 'Offered',
} as { [key: string]: string }

export function JobsKanbanBoard() {
  return (
    <KanbanBoard
      containerStyle={{
        // TODO: Replace magic number math with flexbox solution
        height: 'calc(100vh - 220px)',
        flex: 1,
        overflowX: 'auto',
      }}
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
