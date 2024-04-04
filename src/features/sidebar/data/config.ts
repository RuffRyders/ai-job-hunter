import { ProfileIconSVG } from '@/common/ui/IconsSVG/profile'
import { JobsIconSVG } from '@/common/ui/IconsSVG/jobs'
import { ResumeIconSVG } from '@/common/ui/IconsSVG/resume'

export interface SidebarItem {
  Icon: any
  id: string
  displayName: string
}

const SidebarItemConfig: SidebarItem[] = [
  {
    Icon: ProfileIconSVG,
    id: 'profile',
    displayName: 'Profile',
  },
  {
    Icon: JobsIconSVG,
    id: 'jobs',
    displayName: 'Jobs',
  },
  {
    Icon: ResumeIconSVG,
    id: 'resumeStudio',
    displayName: 'Resume Studio',
  },
]

export default SidebarItemConfig
