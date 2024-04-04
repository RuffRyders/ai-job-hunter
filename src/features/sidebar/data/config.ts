import { ProfileIconSVG } from '@/common/ui/IconsSVG/profile'
import { JobsIconSVG } from '@/common/ui/IconsSVG/jobs'
import { ResumeIconSVG } from '@/common/ui/IconsSVG/resume'

export interface SidebarItem {
  Icon: any
  id: string
  displayName: string
  path: string
}

const SidebarItemConfig: SidebarItem[] = [
  {
    Icon: ProfileIconSVG,
    id: 'profile',
    displayName: 'Profile',
    path: '/candidate/profile',
  },
  {
    Icon: JobsIconSVG,
    id: 'jobs',
    displayName: 'Jobs',
    path: '/candidate/job-tracker',
  },
  {
    Icon: ResumeIconSVG,
    id: 'resumeStudio',
    displayName: 'Resume Studio',
    path: '/candidate/resume',
  },
]

export default SidebarItemConfig
