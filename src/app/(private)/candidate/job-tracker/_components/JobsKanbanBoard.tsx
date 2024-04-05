'use client'

import { KanbanBoard } from '@/common/ui/KanbanBoard'
import { KanbanRenderItemProps } from '@/common/ui/KanbanBoard/components/Item/Item'
import { cn } from '@/common/utils/style/cn'

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
        saved: ['one', 'two', 'three'],
        applied: ['four', 'five', 'six', 'seven'],
        interviewing: ['eight', 'nine', 'ten', 'eleven'],
        offered: [],
      }}
      scrollable
      // onDropItem={({ item, column }) => {}}
      renderItemContents={(value) => {
        return <div>Custom {value}</div>
      }}
    />
  )
}
