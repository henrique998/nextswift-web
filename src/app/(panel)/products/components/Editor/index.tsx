import BulletList from '@tiptap/extension-bullet-list'
import Heading from '@tiptap/extension-heading'
import Anchor from '@tiptap/extension-link'
import OrderedList from '@tiptap/extension-ordered-list'
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { AlertCircle } from 'lucide-react'
import { EditorHeader } from './Header'

interface EditorProps {
  content?: string
  error?: string
  onChange: (content: string | undefined) => void
}

export function Editor({ content, error, onChange }: EditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Camisa branca tamanho M para homens',
      }),
      Underline.configure(),
      Anchor.configure({
        HTMLAttributes: {
          class: 'text-purple-700 cursor-pointer hover:underline',
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: 'list-disc pl-4',
        },
        keepMarks: true,
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: 'list-decimal pl-4',
        },
        keepMarks: true,
      }),
      Heading.configure({
        HTMLAttributes: {
          class: 'heading',
        },
      }),
    ],
    editorProps: {
      attributes: {
        class:
          'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto border-2 border-gray-200 focus:border-purple-700 focus:outline-none h-[280px] p-4 rounded-bl-lg rounded-br-lg overflow-y-auto',
      },
    },
    content,
    onUpdate() {
      onChange(editor?.getHTML())
    },
  })

  function handleToggleBold() {
    editor?.chain().toggleBold().run()
  }

  function handleToggleItalic() {
    editor?.chain().toggleItalic().run()
  }

  function handleToggleUnderline() {
    editor?.chain().toggleUnderline().run()
  }

  function handleToggleStrike() {
    editor?.chain().toggleStrike().run()
  }

  function handleSetLink(url: string) {
    editor?.commands.setLink({
      href: url,
      target: '_blank',
    })
  }

  function handleAlignTextLeft() {
    editor?.commands.setTextAlign('left')
  }

  function handleAlignTextCenter() {
    editor?.commands.setTextAlign('center')
  }

  function handleAlignTextRight() {
    editor?.commands.setTextAlign('right')
  }

  function handleToggleOrderedList() {
    editor?.chain().focus().toggleOrderedList().run()
  }

  function handleToggleBulletList() {
    editor?.chain().focus().toggleBulletList().run()
  }

  function handleToggleHeadingH1() {
    editor?.chain().focus().toggleHeading({ level: 1 }).run()
  }

  function handleToggleHeadingH2() {
    editor?.chain().focus().toggleHeading({ level: 2 }).run()
  }

  function handleToggleHeadingH3() {
    editor?.chain().focus().toggleHeading({ level: 3 }).run()
  }

  function handleToggleHeadingH4() {
    editor?.chain().focus().toggleHeading({ level: 4 }).run()
  }

  function handleToggleHeadingH5() {
    editor?.chain().focus().toggleHeading({ level: 5 }).run()
  }

  function handleToggleHeadingH6() {
    editor?.chain().focus().toggleHeading({ level: 6 }).run()
  }

  const boldData = {
    onToggle: handleToggleBold,
    isActive: !!editor?.isActive('bold'),
  }

  const italicData = {
    onToggle: handleToggleItalic,
    isActive: !!editor?.isActive('italic'),
  }

  const underlineData = {
    onToggle: handleToggleUnderline,
    isActive: !!editor?.isActive('underline'),
  }

  const strikeData = {
    onToggle: handleToggleStrike,
    isActive: !!editor?.isActive('strike'),
  }

  const orderedListData = {
    onToggle: handleToggleOrderedList,
    isActive: !!editor?.isActive('orderedList'),
  }

  const bulletListData = {
    onToggle: handleToggleBulletList,
    isActive: !!editor?.isActive('bulletList'),
  }

  const headingH1Data = {
    onToggle: handleToggleHeadingH1,
    isActive: !!editor?.isActive('heading', { level: 1 }),
  }

  const headingH2Data = {
    onToggle: handleToggleHeadingH2,
    isActive: !!editor?.isActive('heading', { level: 2 }),
  }

  const headingH3Data = {
    onToggle: handleToggleHeadingH3,
    isActive: !!editor?.isActive('heading', { level: 3 }),
  }

  const headingH4Data = {
    onToggle: handleToggleHeadingH4,
    isActive: !!editor?.isActive('heading', { level: 4 }),
  }

  const headingH5Data = {
    onToggle: handleToggleHeadingH5,
    isActive: !!editor?.isActive('heading', { level: 5 }),
  }

  const headingH6Data = {
    onToggle: handleToggleHeadingH6,
    isActive: !!editor?.isActive('heading', { level: 6 }),
  }

  const headings = {
    headingH1Data,
    headingH2Data,
    headingH3Data,
    headingH4Data,
    headingH5Data,
    headingH6Data,
  }

  return (
    <div>
      <EditorHeader
        boldData={boldData}
        italicData={italicData}
        underlineData={underlineData}
        strikeData={strikeData}
        bulletListData={bulletListData}
        orderedListData={orderedListData}
        headingsData={headings}
        onAlignTextLeft={handleAlignTextLeft}
        onAlignTextCenter={handleAlignTextCenter}
        onAlignTextRight={handleAlignTextRight}
        onSetLink={handleSetLink}
      />

      <EditorContent editor={editor} />

      {error && (
        <span className="mt-2 flex items-center gap-2 text-xs font-medium text-red-500">
          <AlertCircle className="h-4 w-4" />{' '}
          {error ? 'Campo obrigatório' : error}
        </span>
      )}
    </div>
  )
}
