/**
 * More model information can be found on the Hugging Face documentation
 *
 * https://huggingface.co/docs/api-inference/detailed_parameters#detailed-parameters
 * https://huggingface.co/models
 */

enum ModelKeys {
  GPT2 = 'gpt2',
  GEMMA = 'gemma',
  MISTRAL = 'mistral',
}

interface LLM_MODEL {
  id: string // Hugging Face model id
}

/**
 * @description: Hugging Face model api info
 */
export const HF_MODELS: Record<ModelKeys, LLM_MODEL> = {
  gpt2: {
    id: 'openai-community/gpt2',
  },
  gemma: {
    id: 'google/gemma-7b-it',
  },
  mistral: {
    id: 'mistralai/Mistral-7B-Instruct-v0.2',
  },
}

/**
 * TODO - deprecate in favor of a runtime configuration
 *
 * The model used for the HF inference API
 */
export const CURRENT_MODEL = HF_MODELS.mistral.id
