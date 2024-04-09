'use server'

import { revalidatePath } from 'next/cache'
import { updateJob } from '../api/jobApplications'
import { JobModel } from '../types'
import { JOB_TRACKER_BASEURL } from '../contants/routes'

export async function updateJobApplication(jobId: string, data: JobModel) {
  revalidatePath(JOB_TRACKER_BASEURL)
  return await updateJob(jobId, data)
}
