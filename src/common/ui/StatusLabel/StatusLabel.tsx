import { cn } from '@/common/utils/style/cn'

export function StatusLabel({
  statusText,
  className,
  color,
}: {
  className?: string
  statusText: string
  color: string
}) {
  return (
    <div
      className={cn(
        'text-white p-1 rounded bg-slate-300 w-full text-center',
        className,
      )}
      style={{ backgroundColor: color }}
    >
      {statusText}
    </div>
  )
}
