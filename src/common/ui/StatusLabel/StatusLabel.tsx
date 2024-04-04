import { cn } from '@/common/utils/style/cn'

export function StatusLabel({
  statusText,
  color,
}: {
  statusText: string
  color: string
}) {
  return (
    <div
      className={cn(
        'text-white p-1 rounded bg-slate-300 w-full text-center user-select-none',
      )}
      style={{ backgroundColor: color }}
    >
      {statusText}
    </div>
  )
}
