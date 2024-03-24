import { createResponse } from '@/common/utils/api/server/createResponse'
import { getJob } from '@/features/jobTracker/data/api/jobApplications'
import { NextRequest } from 'next/server'

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  return createResponse(await getJob(params.id))
}
