export interface EditorButtonProps {
  onToggle: (style: string) => void
  style: string
  label: string
}

export const EditorButton: React.FC<EditorButtonProps> = ({ onToggle, style, label }) => {
  const handleOnClick = (e: React.MouseEvent) => {
    e.preventDefault()
    onToggle(style)
  }

  return <button onMouseDown={handleOnClick}> {label} </button>
}
