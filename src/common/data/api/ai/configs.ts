import { HuggingFaceTextGenerationParameters } from '../types/HuggingFaceTextGenerationParameters'

export const DEFAULT: { parameters: HuggingFaceTextGenerationParameters } = {
  parameters: {
    return_full_text: false,
    max_new_tokens: 250,
  },
}
