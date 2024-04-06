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
      setResume(textToHtml(await resumeTest()))
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
    <div className="flex-1 flex justify-center items-center flex-col px-28 py-10">
      <LoadingOverlay loading={loading} />

      <div className="flex flex-row">
        <Button onPress={runResumeTest} className="mb-12">
          Test Resume Generation
        </Button>

        <Button onPress={runSimpleTest} className="mb-12">
          Test Hardcoded Generation
        </Button>
      </div>
      <div className="flex-1 relative">
        <RichTextEditor content={resume} />
      </div>
    </div>
  )
}

export default ResumeTestPage
