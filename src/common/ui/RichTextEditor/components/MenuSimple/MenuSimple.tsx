import { cn } from '@/utils/style/cn'
import { Editor } from '@tiptap/react'
import styles from './MenuSimple.module.css'

interface MenuSimpleProps {
  editor: Editor
}

const MenuSimple = ({ editor }: MenuSimpleProps) => {
  if (!editor) {
    return null
  }

  return (
    <>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={cn(
          styles.menuButton,
          editor.isActive('bold') && styles['menuButton--active'],
        )}
      >
        bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={cn(
          styles.menuButton,
          editor.isActive('italic') && styles['menuButton--active'],
        )}
      >
        italic
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={cn(
          styles.menuButton,
          editor.isActive('strike') && styles['menuButton--active'],
        )}
      >
        strike
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={cn(
          styles.menuButton,
          editor.isActive('code') && styles['menuButton--active'],
        )}
      >
        code
      </button>
      <button
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
        className={cn(styles.menuButton)}
      >
        clear marks
      </button>
      <button
        onClick={() => editor.chain().focus().clearNodes().run()}
        className={cn(styles.menuButton)}
      >
        clear nodes
      </button>
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={cn(
          styles.menuButton,
          editor.isActive('paragraph') ? 'is-active' : '',
        )}
      >
        paragraph
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={cn(
          styles.menuButton,
          editor.isActive('heading', { level: 1 }) ? 'is-active' : '',
        )}
      >
        h1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={cn(
          styles.menuButton,
          editor.isActive('heading', { level: 2 }) ? 'is-active' : '',
        )}
      >
        h2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={cn(
          styles.menuButton,
          editor.isActive('heading', { level: 3 }) ? 'is-active' : '',
        )}
      >
        h3
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={cn(
          styles.menuButton,
          editor.isActive('heading', { level: 4 }) ? 'is-active' : '',
        )}
      >
        h4
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={cn(
          styles.menuButton,
          editor.isActive('heading', { level: 5 }) ? 'is-active' : '',
        )}
      >
        h5
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={cn(
          styles.menuButton,
          editor.isActive('heading', { level: 6 }) ? 'is-active' : '',
        )}
      >
        h6
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={cn(
          styles.menuButton,
          editor.isActive('bulletList') ? 'is-active' : '',
        )}
      >
        bullet list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={cn(
          styles.menuButton,
          editor.isActive('orderedList') ? 'is-active' : '',
        )}
      >
        ordered list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={cn(
          styles.menuButton,
          editor.isActive('codeBlock') ? 'is-active' : '',
        )}
      >
        code block
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={cn(
          styles.menuButton,
          editor.isActive('blockquote') ? 'is-active' : '',
        )}
      >
        blockquote
      </button>
      <button
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        className={cn(styles.menuButton)}
      >
        horizontal rule
      </button>
      <button
        onClick={() => editor.chain().focus().setHardBreak().run()}
        className={cn(styles.menuButton)}
      >
        hard break
      </button>
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        className={cn(styles.menuButton)}
      >
        undo
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        className={cn(styles.menuButton)}
      >
        redo
      </button>
      <button
        // TODO fix this setColor
        // onClick={() => editor.chain().focus().setColor('#958DF1').run()}
        onClick={() => editor.chain().focus().run()}
        className={cn(
          styles.menuButton,
          editor.isActive('textStyle', { color: '#958DF1' }) ? 'is-active' : '',
        )}
      >
        purple
      </button>
    </>
  )
}

export default MenuSimple
