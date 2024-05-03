import { UsersModel } from '@/common/services/supabase/database.helper.types'
import { createClient } from '@/common/services/supabase/server'

const tableName = 'users'

export async function updateProfile(id: string, data: Partial<UsersModel>) {
  const supabase = await createClient()
  return await supabase
    .from(tableName)
    .update({ ...data, id })
    .eq('id', id)
    .select()
}
