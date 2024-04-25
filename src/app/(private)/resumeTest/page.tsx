'use client'

import { HF_MODELS } from '@/common/data/api/ai/models'
import { Button } from '@/common/ui/Button'
import LoadingOverlay from '@/common/ui/LoadingOverlay'
import { RichTextEditor } from '@/common/ui/RichTextEditor'
import { getErrorMessage } from '@/common/utils/getErrorMessage/getErrorMessage'
import { generateResume } from '@/features/resume/data/api/generateResume'
import { job1 } from '@/features/resume/data/fixtures/jobDescription'
import { user1 } from '@/features/resume/data/fixtures/userInfo'
import { resumeTest, simpleTest } from '@/features/resume/resumeTest'
import { useState } from 'react'

const ResumeTestPage = () => {
  const [loading, setLoading] = useState(false)
  const [resume, setResume] = useState('' as string)

  const [selectedModel, setSelectedModel] = useState(HF_MODELS.mistral)

  const runResumeTest = async () => {
    setLoading(true)
    try {
      // setResume(textToHtml(await resumeTest()))
      setResume(await resumeTest())
    } catch (err) {
      console.error(err)
      const errorMessage = getErrorMessage(err)
      alert(errorMessage)
    }
    setLoading(false)
  }

  const runSimpleTest = async () => {
    setLoading(true)
    // setResume(textToHtml(await simpleTest()))
    setResume(await generateResume(user1, job1))
    setLoading(false)
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <LoadingOverlay loading={loading} />

      <div className="flex flex-row justify-center my-6">
        {/* <Button onPress={runResumeTest}>Test Resume Generation</Button> */}

        <Button onPress={runSimpleTest}>Generate Resume</Button>
      </div>

      <div className="flex flex-1 flex-col overflow-auto">
        <RichTextEditor content={resume} className="" />
      </div>
    </div>
  )
}

export default ResumeTestPage
