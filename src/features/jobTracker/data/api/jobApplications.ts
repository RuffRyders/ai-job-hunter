import { createClient } from '@/common/services/supabase/server'
import { JobModel } from '../types'

const tableName = 'jobApplications'

export async function getJobsCount() {
  const supabase = await createClient()
  return await supabase
    .from(tableName)
    .select('*', { count: 'exact', head: true })
}

export async function getJobs(limit = 10, offset = 0, orderBy = 'updatedAt') {
  const supabase = await createClient()
  return await supabase
    .from(tableName)
    .select()
    .range(offset, offset + limit)
    .order(orderBy, { ascending: false })
}

export async function getJob(id: string) {
  const supabase = await createClient()
  return await supabase.from(tableName).select().eq('id', id)
}

export async function createJob(data: JobModel) {
  const supabase = await createClient()
  return await supabase
    .from(tableName)
    .insert({ ...data })
    .select()
}

export async function updateJob(id: string, data: Partial<JobModel>) {
  const supabase = await createClient()
  console.log('update', id, data)
  return await supabase
    .from(tableName)
    .update({ ...data, id })
    .eq('id', id)
    .select()
}

export async function deleteJob(id: string) {
  const supabase = await createClient()
  return await supabase.from(tableName).delete().eq('id', id)
}
