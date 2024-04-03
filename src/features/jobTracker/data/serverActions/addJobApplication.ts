'use server'

import { revalidatePath } from 'next/cache'
import { createJob } from '../api/jobApplications'
import { JobModel } from '../types'

export async function addJobApplication(data: JobModel) {
  revalidatePath('/candidate/job-tracker')
  return await createJob(data)
}
