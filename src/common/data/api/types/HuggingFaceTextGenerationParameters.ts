/**
 * https://huggingface.co/docs/api-inference/en/detailed_parameters#text-generation-task
 * 
= Text generation parameters =
{
  inputs                  (required):	a string to be generated from

  parameters: {
    top_k	                (Default: None). Integer to define the top tokens considered within the sample operation to create new text.
    top_p	                (Default: None). Float to define the tokens that are within the sample operation of text generation. Add tokens in the sample for more probable to least probable until the sum of the probabilities is greater than top_p.
    temperature	          (Default: 1.0). Float (0.0-100.0). The temperature of the sampling operation. 1 means regular sampling, 0 means always take the highest score, 100.0 is getting closer to uniform probability.
    repetition_penalty	  (Default: None). Float (0.0-100.0). The more a token is used within generation the more it is penalized to not be picked in successive generation passes.
    max_new_tokens	      (Default: None). Int (0-250). The amount of new tokens to be generated, this does not include the input length it is a estimate of the size of generated text you want. Each new tokens slows down the request, so look for balance between response times and length of text generated.
    max_time	            (Default: None). Float (0-120.0). The amount of time in seconds that the query should take maximum. Network can cause some overhead so it will be a soft limit. Use that in combination with max_new_tokens for best results.
    return_full_text	    (Default: True). Bool. If set to False, the return results will not contain the original query making it easier for prompting.
    num_return_sequences	(Default: 1). Integer. The number of proposition you want to be returned.
    do_sample	            (Optional: True). Bool. Whether or not to use sampling, use greedy decoding otherwise.
  }
  
  options: {
    use_cache	          (Default: true). Boolean. There is a cache layer on the inference API to speedup requests we have already seen. Most models can use those results as is as models are deterministic (meaning the results will be the same anyway). However if you use a non deterministic model, you can set this parameter to prevent the caching mechanism from being used resulting in a real new query.
    wait_for_model	    (Default: false) Boolean. If the model is not ready, wait for it instead of receiving 503. It limits the number of requests required to get your inference done. It is advised to only set this flag to true after receiving a 503 error as it will limit hanging in your application to known places.
  }
}
 */

export type HuggingFaceInput = string

export interface HuggingFaceTextGenerationParameters {
  top_k?: number
  top_p?: number
  temperature?: number
  repetition_penalty?: number
  max_new_tokens?: number
  max_time?: number
  return_full_text?: boolean
  num_return_sequences?: number
  do_sample?: boolean
}

export interface HuggingFaceTextGenerationOptions {
  use_cache?: boolean
  wait_for_model?: boolean
}
