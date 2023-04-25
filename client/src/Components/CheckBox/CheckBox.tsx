import styled from 'styled-components'

export interface CheckboxProps {
  className?: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  isChecked: boolean
  value: string
}

export const Checkbox: React.FC<CheckboxProps> = ({ className, isChecked, onChange, value }) => {
  return (
    <CheckboxContainer className={className}>
      <Input type="checkbox" checked={isChecked} onChange={onChange} value={value} />
    </CheckboxContainer>
  )
}

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
  cursor: pointer;

  margin-right: 6px;
`

const Input = styled.input`
  border-radius: unset;
  cursor: pointer;
`
