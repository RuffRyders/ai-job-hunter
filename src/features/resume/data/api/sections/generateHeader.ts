import { ResumeInputUserInfo } from '../../../types/types'

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
      `<a href="${encodeURI(linkedin)}" target="_blank" aria-label="LinkedIn Profile">${linkedin}</a>`,
    )
  }
  if (github) {
    links.push(
      `<a href="${encodeURI(github)}" target="_blank" aria-label="GitHub Profile">${github}</a>`,
    )
  }
  if (website) {
    links.push(
      `<a href="${encodeURI(website)}" target="_blank" aria-label="Personal Website">${website}</a>`,
    )
  }

  const linksHTML = links.join(' | ')

  return `
    <p>
        <strong><span style="font-size: 24px">${firstName} ${lastName}</span></strong>
        <span style="font-size: 14px">
        ${location ? `${location}` : ''} | ${phone}
        ${email ? ` | ${email}` : ''}
        ${links.length > 0 ? ` | ${linksHTML}` : ''}
        </span>
    </p>
    <hr>
  `
}
