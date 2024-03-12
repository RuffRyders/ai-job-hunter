import TipTapEditor from '@/components/RichTextEditor/TipTapEditor'
import testResume from '@/data/samples/resume/testResume1'

export default function Page() {
    return (
        <div className="m-6 mb-20">
            <TipTapEditor resumeHTML={testResume} />
        </div>
    )
}
