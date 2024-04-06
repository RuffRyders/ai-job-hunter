'use client'

import { Button } from '@/common/ui/Button'
import LoadingOverlay from '@/common/ui/LoadingOverlay'
import { RichTextEditor } from '@/common/ui/RichTextEditor'
import { getErrorMessage } from '@/common/utils/getErrorMessage/getErrorMessage'
import { textToHtml } from '@/common/utils/string/textToHtml'
import { resumeTest, simpleTest } from '@/features/resume/resumeTest'
import { useState } from 'react'

const ResumeTestPage = () => {
  const [loading, setLoading] = useState(false)
  const [resume, setResume] = useState('' as string)

  const [message, setMessage] = useState('' as string)

  console.log('resume: ', resume)

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
    setResume(textToHtml(await simpleTest()))
    setLoading(false)
  }

  return (
    <div className="flex-1 flex-col overflow-auto bg-purple-300">
      <LoadingOverlay loading={loading} />

      <div className="flex flex-row justify-center mb-12">
        <Button onPress={runResumeTest}>Test Resume Generation</Button>

        <Button onPress={runSimpleTest}>Test Hardcoded Generation</Button>
      </div>

      <div className="flex flex-1 overflow-auto">
        <RichTextEditor content={resume} />
      </div>
    </div>
  )
}

export default ResumeTestPage
