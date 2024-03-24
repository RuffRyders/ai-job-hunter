'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { fetchCoverLetter } from '@/common/data/api/fetchCoverLetter'
import { textToHtml } from '@/common/utils/string/textToHtml'
import { jobs } from '@/features/bot/data/samples/jobs'
import { BotChat, PromptStep } from '@/features/bot/ui/BotChat'

export default function Home() {
  const [coverLetter, setCoverLetter] = useState<string>()
  const [jobDescription, setJobDescription] = useState('')
  const [stepIndex, setStepIndex] = useState(-1)

  const reset = useCallback(() => {
    setCoverLetter(undefined)
    setJobDescription('')
    setStepIndex(-1)
  }, [])

  useEffect(() => {
    if (stepIndex === -1) {
      setStepIndex(stepIndex + 1)
    }
  }, [stepIndex])

  const steps = useMemo(
    () =>
      [
        {
          botText:
            'Hi. I am an AI Job Assistant. I have been tasked with writing cover letters.',
          options: [
            {
              label: "Let's get started!",
              onAction: () => {
                setStepIndex(stepIndex + 1)
              },
            },
          ],
        },
        {
          botText:
            'Stupendous! I just need the job description to work my magic.',
          data: jobDescription,
          inputType: 'textarea',
          inputPlaceholder: 'Paste the job description...',
          onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) =>
            setJobDescription(event.target.value),
          options: [
            {
              label: 'Send',
              onAction: async () => {
                return await fetchCoverLetter({
                  jobDescription,
                })
              },
              onDone: (data?: any) => {
                const converted = textToHtml(data.generatedCoverLetter)
                setCoverLetter(converted)
                setStepIndex(stepIndex + 1)
              },
              onError: (error: unknown) => {
                console.log(error)
              },
            },
            {
              label: 'Use test data',
              onAction: async () => {
                setJobDescription(jobs.disney)
                return await fetchCoverLetter({
                  jobDescription: jobs.disney,
                })
              },
              onDone: (data?: any) => {
                const converted = textToHtml(data.generatedCoverLetter)
                setCoverLetter(converted)
                setStepIndex(stepIndex + 1)
              },
              onError: (error: unknown) => {
                console.log(error)
              },
            },
          ],
        },
        {
          botText: 'Here is your generated cover letter...',
          data: coverLetter,
          inputType: 'editor',
          onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) =>
            setCoverLetter(event.target.value),
          options: [
            {
              label: 'Reset',
              onAction: () => {
                reset()
              },
            },
            {
              label: 'Save',
              onAction: () => {
                alert('Save!\n\n' + coverLetter)
              },
            },
          ],
        },
      ] as PromptStep[],
    [coverLetter, jobDescription, stepIndex, reset],
  )

  return (
    <div className="max-w-5xl h-full p-6 container mx-auto">
      <BotChat botSteps={steps} stepIndex={stepIndex} />
    </div>
  )
}
