import { useState, useRef, useEffect } from 'react'

import { Editor, EditorState, RichUtils } from 'draft-js'
import 'draft-js/dist/Draft.css'

import { EditorButton } from './Components/EditorButton'

const BLOCK_TYPES = [
  { label: 'H1', style: 'header-one' },
  { label: 'H2', style: 'header-two' },
  { label: 'H3', style: 'header-three' },
  { label: 'H4', style: 'header-four' },
  { label: 'H5', style: 'header-five' },
  { label: 'H6', style: 'header-six' },
  { label: 'Blockquote', style: 'blockquote' },
  { label: 'UL', style: 'unordered-list-item' },
  { label: 'OL', style: 'ordered-list-item' },
  { label: 'Code Block', style: 'code-block' },
]

const INLINE_STYLES = [
  { label: 'Bold', style: 'BOLD' },
  { label: 'Italic', style: 'ITALIC' },
  { label: 'Underline', style: 'UNDERLINE' },
  { label: 'Monospace', style: 'CODE' },
]

export const RichTextEditor = () => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty())

  const editor = useRef<HTMLDivElement | any>(null)

  const focusEditor = () => {
    editor?.current?.focus()
  }

  useEffect(() => {
    focusEditor()
  }, [])

  const onBlockClick = (e: string) => {
    const nextState = RichUtils.toggleBlockType(editorState, e)
    setEditorState(nextState)
  }

  const onInlineClick = (e: string) => {
    const nextState = RichUtils.toggleInlineStyle(editorState, e)
    setEditorState(nextState)
  }

  return (
    <div onClick={focusEditor}>
      <div>
        {BLOCK_TYPES.map(type => (
          <EditorButton key={type.label} onToggle={onBlockClick} style={type.style} label={type.label} />
        ))}

        {INLINE_STYLES.map(type => (
          <EditorButton key={type.label} onToggle={onInlineClick} style={type.style} label={type.label} />
        ))}
      </div>

      <div>
        <Editor ref={editor} editorState={editorState} onChange={editorState => setEditorState(editorState)} />
      </div>
    </div>
  )
}
