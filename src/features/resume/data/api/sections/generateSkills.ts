import { ResumeInputUserInfo } from '../../../types/types'

export const generateSkills = ({ skills }: ResumeInputUserInfo) => {
  return `
    <p>
        <strong><span style="font-size: 17px">Skills</span></strong>
        <br>
        <span style="font-size: 15px">${skills.join(', ')}</span>
    </p>
    <hr>
  `
}


