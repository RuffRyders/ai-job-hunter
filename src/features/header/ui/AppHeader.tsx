import Avatar from '@/features/header/ui/Avatar'
import fetchUserData from '@/features/header/data/fetchUserData'

export default async function AppHeader() {
  const { data, error } = await fetchUserData()

  if (error) {
    console.log('Error fetching user data: ', error)
  }

  return (
    <div className="w-full h-16 sm:h-18 bg-white border-b-[1px] border-b-gray-300 flex flex-row items-center justify-between px-6 py-3">
      <div className="font-bold text-lg">branding here</div>
      {data && <Avatar email={data.email} avatarUrl={data.avatarUrl} />}
      {!data && <div className="text-red-500">X</div>}
    </div>
  )
}
