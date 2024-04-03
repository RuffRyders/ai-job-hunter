import { getJob } from '@/features/jobTracker/data/api/jobApplications'
import { JobEditor } from '@/features/jobTracker/ui/JobEditor'

export interface PageProps {
  params: { id: string }
}

export default async function Page({ params: { id } }: PageProps) {
  const result = await getJob(id)
  console.log('ssr result', result)
  return <JobEditor isOpen={true} jobId={id} values={result.data?.[0]} />
}
