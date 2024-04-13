export const BASE_INSTRUCTIONS: string[] = [
  'Pretend that you are an experienced career and resume coach.',
  `Generate a resume using the provided user information${jobDescription ? ', job description' : ''}${previousResume ? ', existing resume ' : ''} that follows popular resume writing conventions and follows the guidelines provided.`,
]

export const BASE_INSTRUCTIONS_STRING = BASE_INSTRUCTIONS.join('\n')
