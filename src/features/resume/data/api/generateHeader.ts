import { ResumeInputUserInfo } from '../../types/types'

export const generateHeader = ({
  firstName,
  lastName,
  email,
  phone,
  location,
  linkedin,
  github,
  website,
}: ResumeInputUserInfo) => {
  const links = []

  if (linkedin) {
    links.push(
      `<a href="${encodeURI(linkedin)}" target="_blank" aria-label="LinkedIn Profile">LinkedIn</a>`,
    )
  }
  if (github) {
    links.push(
      `<a href="${encodeURI(github)}" target="_blank" aria-label="GitHub Profile">GitHub</a>`,
    )
  }
  if (website) {
    links.push(
      `<a href="${encodeURI(website)}" target="_blank" aria-label="Personal Website">Website</a>`,
    )
  }

  const linksHTML = links.join(' | ')

  return `
    <p>
        <strong style="font-size: 24px; font-weight: bold;">${firstName} ${lastName}</strong><br>
        ${location ? `${location} | ` : ''}${phone}<br>
        ${email}<br>
        ${links.length > 0 ? `${linksHTML}` : ''}
    </p>
    <hr>
  `
}

