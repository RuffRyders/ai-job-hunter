import { createResponse } from '@/common/utils/api/server/createResponse'
import { getJobs } from '@/features/jobTracker/data/api/jobApplications'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  return createResponse(await getJobs())
}
