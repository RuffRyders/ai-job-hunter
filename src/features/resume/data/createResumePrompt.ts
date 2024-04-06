// TODO store base rules near ai service...
const BASE_RULES: string[] = [] // any global rules for prompts

interface CreateResumePromptParams {
  userInfo: ResumeInputUserInfo
  jobDescription?: string
  previousResume?: string
  resumeTemplate?: string
  rules?: string[]
  promptTemplate?: (rawPrompt: string) => string
  responseSeed?: string
}

// https://huggingface.co/google/gemma-7b-it#chat-template
export const createResumePrompt = ({
  userInfo,
  jobDescription,
  previousResume,
  resumeTemplate,
  rules: rulesProp = [],
  promptTemplate,
  responseSeed,
}: CreateResumePromptParams) => {
  let prompt = `
${BASE_RULES.join('\n')}
Generate a resume using the provided user information${jobDescription ? ', job description' : ''}${previousResume ? ', existing resume ' : ''} that follows popular resume writing conventions and follows the guidelines provided.
`

  if (previousResume) {
    prompt += `This is an existing resume for the same person to use as a guide to fill in any gaps: ${previousResume}.`
  }

  // if (resumeTemplate) {
  //   prompt += `The resume should be based on the following template: ${resumeTemplate}.`
  // }

  let resume_rules = [
    'Use these base rules to guide the resume creation:',
    'The resume should be no longer than one page.',
    'The resume should be easy to read and well-organized.',
    // contact info
    "The resume should include at the top the user's full name, contact information, and website (linkedin, github, personal website, etc.).",
    // skills
    "The resume should start with a list of the user's top 5 - 10 skills.",
    // experience
    "The resume should begin with a list of the user's last 3 - 4 professional experiences.",
    "Each experience should contain the user's job title, the company name, the dates of employment, and 2 - 3 short bullet points summarizing duties or accomplishments.",
    'Prefer action verbs and quantify accomplishments where possible.',
    // education
    "The resume should include a list of the user's education, and any relevant certifications.",
    'The resume should be written in a professional tone and use proper grammar and spelling.',
  ]

  for (const rule of resume_rules) {
    prompt += `\n${rule}`
  }

  if (rulesProp.length > 0) {
    prompt +=
      '\nAlso consider these supplementary rules.  They should take precedents over the base rules:'
    for (const rule of rulesProp) {
      prompt += `\n${rule}`
    }
  }

  prompt += `\n\nUser information START\n${JSON.stringify(userInfo)}.\nUser information END`

  if (jobDescription) {
    prompt += `\n\nJob description START\n${jobDescription}.\nJob description END`
  }

  const applyPromptTemplate = promptTemplate || ((rawPrompt) => rawPrompt)

  return applyPromptTemplate(prompt)
}
