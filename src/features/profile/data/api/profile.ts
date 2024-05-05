import { createClient } from '@/common/services/supabase/server'
import { Education, Experience, ProfileModel, Skill } from '../types'
import { SupabaseClient } from '@supabase/supabase-js'
import { v4 as uuidv4 } from 'uuid'

const tableName = 'users'

async function delsert<T>(
  db: SupabaseClient,
  collectionName: string,
  userId: string,
  items?: T[],
) {
  if (items) {
    await db.from(collectionName).delete().eq('userId', userId)
    const result = await db.from(collectionName).insert(
      items.map((item) => ({ ...item, userId })),
      { defaultToNull: false },
    )
  }
}

export async function updateProfile(
  userId: string,
  data: Partial<ProfileModel>,
) {
  console.log('user model', data)
  const supabase = await createClient()
  const { education, experience, skills, ...user } = data

  // update education
  await delsert<Education>(supabase, 'education', userId, education)

  // update experience
  await delsert<Experience>(supabase, 'experience', userId, experience)

  // TODO: update skills
  await delsert<Skill>(supabase, 'skills', userId, skills)

  // update user profile (users table)
  return await supabase
    .from(tableName)
    .update({ ...user })
    .eq('id', userId)
    .select()
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
