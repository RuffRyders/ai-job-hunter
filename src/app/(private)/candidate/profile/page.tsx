import { createClient } from '@/common/services/supabase/server'
import { getProfile } from '@/features/profile/data/api/profile'
import { ProfileForm } from '@/features/profile/ui/ProfileForm'

export default async function Profile() {
  const client = createClient()
  const userId = (await client.auth.getUser())?.data?.user?.id
  if (userId) {
    const { data, error } = await getProfile(userId)
    if (!data || !userId) {
      return 'Whoops!'
    }
    console.log('data', data)
    return (
      <div className="h-full p-6 container mx-auto">
        <div className="h-full flex flex-col gap-2">
          <ProfileForm
            userId={userId}
            values={{
              avatarUrl: data.avatarUrl || undefined,
              education: data.education?.map((education) => ({
                degreeType: education.degreeType || '',
                discipline: education.discipline || undefined,
                gpa: education.gpa || undefined,
                id: education.id,
                schoolName: education.schoolName || '',
              })),
              email: data.email || undefined,
              experience: data.experience?.map((experience) => ({
                companyName: experience.companyName || '',
                description: experience.description || undefined,
                endDate: experience.endDate || undefined,
                id: experience.id,
                isCurrent: experience.isCurrent || false,
                jobTitle: experience.jobTitle || '',
                location: experience.location || undefined,
                startDate: experience.startDate || undefined,
              })),
              firstName: data.firstName || undefined,
              lastName: data.lastName || undefined,
              location: data.location || undefined,
              phoneNumber: data.phoneNumber || undefined,
              skills: data.skills?.map((skill) => ({
                id: skill.id,
                name: skill.name,
              })),
            }}
          />
        </div>
      </div>
    )
  }
  return <div>Whoops! An error orrurred.</div>
}
