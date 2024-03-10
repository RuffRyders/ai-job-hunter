export class PromptGenerator {
    public static generatePrompt(
        jobDescription: string,
        coverLetter: string
    ): string {
        return `Please return an updated, optimized and tailored cover letter for the supplied job description.\n\nJob Description: ${jobDescription}\n\nCover Letter: ${coverLetter}`
    }
}
