import { RichTextEditor } from '@/common/ui/RichTextEditor/TipTapEditor'
import testResume from '@/features/bot/data/samples/resume/testResume1'

export default function Page() {
  return (
    <div className="m-6 mb-20">
      <RichTextEditor content={testResume} />
    </div>
  )
}
