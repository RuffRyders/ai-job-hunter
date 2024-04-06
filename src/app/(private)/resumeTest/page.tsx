'use client'

import { Button } from '@/common/ui/Button'
import LoadingOverlay from '@/common/ui/LoadingOverlay'
import { RichTextEditor } from '@/common/ui/RichTextEditor'
import { getErrorMessage } from '@/common/utils/getErrorMessage/getErrorMessage'
import { resumeTest, simpleTest } from '@/features/resume/resumeTest'
import { useState } from 'react'

const ResumeTestPage = () => {
  const [loading, setLoading] = useState(false)
  const [resume, setResume] = useState('' as string)

  const runResumeTest = async () => {
    setLoading(true)
    try {
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
    await simpleTest()
    setLoading(false)
  }

  return (
    <div className="w-full h-full flex justify-center items-center flex-col">
      <LoadingOverlay loading={loading} />

      <Button onPress={runResumeTest}>Test Resume Generation</Button>

      <RichTextEditor content={resume} />
    </div>
  )
}

export default ResumeTestPage
