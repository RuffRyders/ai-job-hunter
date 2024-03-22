import { createClient } from '@/services/auth/supabase/server'

const tableName = 'jobApplications'

export async function getJobs() {
  const supabase = await createClient()
  return await supabase.from(tableName).select()
}

export async function saveJob(id: string, data: any) {
  const supabase = await createClient()
  return await supabase
    .from(tableName)
    .upsert({ ...data, id })
    .select()
}
