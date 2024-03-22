import { cn } from '@/utils/style/cn'

export function StatusLabel({
  statusText,
  color,
}: {
  statusText: string
  color: string
}) {
  return (
    <div
      className={cn('text-white px-1 rounded bg-slate-300 w-full text-center')}
      style={{ backgroundColor: color }}
    >
      {statusText}
    </div>
  )
}
