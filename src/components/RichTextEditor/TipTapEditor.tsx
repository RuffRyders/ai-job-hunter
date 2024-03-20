'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'
import MenuSimple from './components/MenuSimple/MenuSimple'
import { cn } from '@/utils/style/cn'
import './TipTapEditor.css'

const editorContentActual = 'editor-content-actual'

interface RichTextEditorProps {
  content: string
}

export const RichTextEditor = ({ content }: RichTextEditorProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    editorProps: {
      attributes: {
        id: editorContentActual,
        // TODO: We may need to use real world units?  Play around and test
        // width: 210mm;
        // height: 297mm;
        // padding: 20mm;
        class: cn(
          'm-2 bg-white text-black',
          'aspect-a4-document', // Aspect ratio of A4 paper
          'w-[794px]', // Width of A4 paper in pixels
          'm-auto p-[20px]', // Centered and padding inside the editor to simulate margins
          // Allows scrolling within the editor if the content exceeds A4 height
          // TODO: display a line in the editor representing the end of the page
          'overflow-y-auto',
          'shadow-md',
        ),
      },
    },
    content,
  })

  const copyHTMLToClipboard = () => {
    const currentHTML = editor?.getHTML()

    if (!currentHTML) {
      throw new Error('No HTML content found in the editor')
    }

    navigator.clipboard.writeText(currentHTML)
  }

  const downloadPDF = () => {
    // Assuming the editor content is wrapped in a div with a specific class or id
    const editorContent: HTMLElement | null =
      document.getElementById(editorContentActual)

    if (editorContent) {
      // TODO - need to test this heavily on different browsers and devices (especially testing different DPIs and screen sizes)
      html2canvas(editorContent).then((canvas) => {
        const imgData = canvas.toDataURL('image/png')

        // Set up A4 document in portrait orientation using mm for accurate dimensions
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4',
        })

        const a4WidthMM = 210 // standard width in mm for A4 document
        const a4HeightMM = 297 // standard height in mm for A4 document

        // Calculate the scale factor to fit the canvas within A4 size
        // we're finding the limiting dimension and scaling based on that
        let scale = Math.min(
          a4WidthMM / canvas.width,
          a4HeightMM / canvas.height,
        )

        // Calculate the dimensions to fit within A4, maintaining aspect ratio
        const scaledWidth = canvas.width * scale
        const scaledHeight = canvas.height * scale

        // Calculate position to center the image, just in case the ratios don't match exactly
        const xPosition = (a4WidthMM - scaledWidth) / 2
        const yPosition = (a4HeightMM - scaledHeight) / 2

        console.log('calculated scale: ', scale)
        console.log('a4 aspect ratio: ', a4WidthMM / a4HeightMM)
        console.log('canvas aspect ratio', canvas.width / canvas.height)
        console.log('canvas dimensions: ', canvas.width, canvas.height)

        pdf.addImage(
          imgData,
          'PNG',
          xPosition,
          yPosition,
          scaledWidth,
          scaledHeight,
        )

        pdf.save('generated-content.pdf')
      })
    }
  }

  return (
    <div>
      {editor && <MenuSimple editor={editor} />}
      <EditorContent editor={editor} className="editor-content" />
      <div className="absolute top-1/2 right-6 flex flex-col">
        <button
          onClick={downloadPDF}
          className="p-2 border border-gray-700 rounded-md mt-4 bg-green-500 text-white"
        >
          Download as PDF
        </button>
        <button
          onClick={copyHTMLToClipboard}
          className="p-2 border border-gray-700 rounded-md mt-4 bg-green-500 text-white"
        >
          Copy HTML
        </button>
      </div>
    </div>
  )
}

// TODOs

// - Make sure editor dimensions and content are proportionally scaled to match the real world dimensions of a resume (A4)
// - Make sure the PDF export logic correctly maintains the proportions of the editor content
