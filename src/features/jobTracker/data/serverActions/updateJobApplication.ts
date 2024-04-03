'use server'

import { revalidatePath } from 'next/cache'
import { updateJob } from '../api/jobApplications'
import { JobModel } from '../types'

export async function updateJobApplication(jobId: string, data: JobModel) {
  revalidatePath('/candidate/job-tracker')
  return await updateJob(jobId, data)
}
