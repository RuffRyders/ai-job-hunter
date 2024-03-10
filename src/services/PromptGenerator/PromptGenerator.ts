export class PromptGenerator {
  public static generatePrompt(
    jobDescription: string,
    coverLetter: string
  ): string {
    return `Pretend that you are an experienced job seeker applying for a job.\n
        Please write an job application cover letter for the supplied job description.\n\nJob Description: ${jobDescription}`;
  }
}
