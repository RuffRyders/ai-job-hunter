/**
 * More model information can be found on the Hugging Face documentation
 *
 * https://huggingface.co/docs/api-inference/detailed_parameters#detailed-parameters
 * https://huggingface.co/models
 */

/**
 * @description: Hugging Face model api info
 */
export const HF_MODELS = {
  gpt2: {
    id: "gpt2",
  },
  gemma: {
    id: "google/gemma-7b-it",
  },
};

/**
 * The model used for the HF inference API
 */
export const CURRENT_MODEL = HF_MODELS.gemma.id;
