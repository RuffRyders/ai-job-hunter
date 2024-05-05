'use server'

import { revalidatePath } from 'next/cache'
import { updateProfile } from '../api/profile'
import { PROFILE_BASEURL } from '../constants/routes'
import { ProfileModel } from '../types'

export async function updateUserProfile(
  userId: string,
  data: Partial<ProfileModel>,
) {
  revalidatePath(PROFILE_BASEURL)
  try {
    return await updateProfile(userId, data)
  } catch (error) {
    console.log(error)
  }
}
