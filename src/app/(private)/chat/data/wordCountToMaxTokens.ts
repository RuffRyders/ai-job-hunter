interface WordCountToMaxTokensParams {
  wordCount: number
  curveFactor?: number
  minWords?: number
  maxWords?: number
  minTokens?: number
  maxTokens?: number
}

export function wordCountToMaxTokens({
  wordCount,
  curveFactor = 1,
  minWords = 0,
  maxWords = 1000,
  minTokens = 10,
  maxTokens = 250,
}: WordCountToMaxTokensParams): number {
  // Ensure wordCount is within bounds
  wordCount = Math.max(minWords, Math.min(maxWords, wordCount))

  // Normalize wordCount to a 0-1 range
  const normalizedWordCount = (wordCount - minWords) / (maxWords - minWords)

  // Apply curve transformation directly, as the logic is the same for curveFactor <, >, or = 1
  const adjustedWordCount = normalizedWordCount ** curveFactor

  // Map the adjusted normalized value back to the token range
  const tokens = adjustedWordCount * (maxTokens - minTokens) + minTokens

  // Ensure tokens value is within the specified bounds and rounded to the nearest whole number
  return Math.round(Math.max(minTokens, Math.min(maxTokens, tokens)))
}

// Example usage:
console.log(wordCountToMaxTokens({ wordCount: 10, curveFactor: 0.5 })) // Smaller curveFactor, less growth
console.log(wordCountToMaxTokens({ wordCount: 25, curveFactor: 1.0 })) // Linear growth
console.log(wordCountToMaxTokens({ wordCount: 40, curveFactor: 2.0 })) // Larger curveFactor, more growth
