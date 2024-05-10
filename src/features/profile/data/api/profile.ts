import { createClient } from '@/common/services/supabase/server'
import { Education, Experience, ProfileModel, Skill } from '../types'
import { SupabaseClient } from '@supabase/supabase-js'

const tableName = 'users'

async function delsert<T>(
  db: SupabaseClient,
  collectionName: string,
  userId: string,
  items?: T[],
) {
  if (items) {
    await db.from(collectionName).delete().eq('userId', userId)
    const { error, data } = await db.from(collectionName).insert(
      items.map((item) => ({ ...item, userId })),
      { defaultToNull: false },
    )
    if (error) {
      throw error
    }
    return data
  }
}

export async function updateProfile(
  userId: string,
  data: Partial<ProfileModel>,
) {
  console.log('user model', data)
  const supabase = await createClient()
  // TODO: Move complicatetd logic to PostrgreSQL function for transaction-based approach
  const { education, experience, skills, ...user } = data

  // update education
  await delsert<Education>(supabase, 'education', userId, education)

  // update experience
  await delsert<Experience>(supabase, 'experience', userId, experience)

  // TODO: update skills
  await delsert<Skill>(supabase, 'skills', userId, skills)

  // update user profile (users table)
  const { error, data: profileData } = await supabase
    .from(tableName)
    .update({ ...user })
    .eq('id', userId)
    .select()
    .single()

  if (error) {
    throw error
  }

  return profileData
}

export async function getProfile(id: string) {
  const supabase = await createClient()
  return await supabase
    .from(tableName)
    .select(
      `avatarUrl,
      firstName,
      lastName,
      email,
      location,
      phoneNumber,
      experience(*),
      education(*),
      skills(*)`,
    )
    .eq('id', id)
    .single()
}
