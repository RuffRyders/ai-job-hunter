import { CardEditor } from '@/features/jobTracker/ui/CardEditor'

export interface PageProps {
  params: { id: string }
}

export default function Page({ params: { id } }: PageProps) {
  console.log('modal route', id)
  return <CardEditor isOpen={true} jobId={id} />
}
