import { JobEditor } from '@/features/jobTracker/ui/JobEditor'

export interface PageProps {
  params: { id: string }
}

export default function Page({ params: { id } }: PageProps) {
  return <JobEditor isOpen={true} jobId={id} />
}
