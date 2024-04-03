'use server'

import { createJob } from '../api/jobApplications'
import { JobModel } from '../types'

export async function addJobApplication(data: JobModel) {
  return await createJob(data)
}
