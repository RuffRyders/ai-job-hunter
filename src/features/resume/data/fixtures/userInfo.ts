import { ResumeInputUserInfo } from '../../types/types'

export const user1: ResumeInputUserInfo = {
  firstName: 'John',
  lastName: 'Appleseed',
  email: 'jappleseed@gmail.com',
  phone: '555-555-5555',
  website: 'jappleseed.com',
  linkedin: 'linkedin.com/jappleseed',
  github: 'github.com/jappleseed',
  location: 'San Francisco, CA',
  skills: [
    'JavaScript',
    'React',
    'Node.js',
    'Express',
    'MongoDB',
    'HTML',
    'CSS',
  ],
  experiences: [
    {
      title: 'Software Engineer',
      company: 'Apple',
      startDate: '2019-01-01',
      endDate: '2021-01-01',
      summary: [
        'Developed new features for the Apple website using React and Node.js.',
        'Collaborated with a team of engineers to build a new internal tool for tracking customer data.',
      ],
    },
    {
      title: 'Web Developer',
      company: 'Google',
      startDate: '2017-01-01',
      endDate: '2019-01-01',
      summary: [
        'Built and maintained the Google homepage using HTML and CSS.',
        'Optimized website performance to improve user experience.',
      ],
    },
  ],
  education: [
    {
      institution: 'Stanford University',
      credentialType: 'Bachelor of Science',
      fieldOfStudy: 'Computer Science',
      startDate: '2013-01-01',
      endDate: '2017-01-01',
    },
  ],
}
