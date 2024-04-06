import { JOB_TRACKER_BASEURL } from '@/features/jobTracker/data/contants/routes'
import { IconFileText, IconList, IconUserEdit, IconMessage } from '@tabler/icons-react'

export interface SidebarItem {
  Icon: any
  id: string
  displayName: string
  path: string
}

const SidebarItemConfig: SidebarItem[] = [
  {
    Icon: IconUserEdit,
    id: 'profile',
    displayName: 'Profile',
    path: '/candidate/profile',
  },
  {
    Icon: IconList,
    id: 'jobs',
    displayName: 'Job Tracker',
    path: JOB_TRACKER_BASEURL,
  },
  {
    Icon: IconFileText,
    id: 'resumeStudio',
    displayName: 'Resume Studio',
    // path: '/candidate/resume',
    path: '/resumeTest',
  },
  {
    Icon: IconMessage,
    id: 'chat',
    displayName: 'Chat',
    path: '/chat',
  },
]

export default SidebarItemConfig
