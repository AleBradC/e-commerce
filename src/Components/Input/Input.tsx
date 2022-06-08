import { forwardRef, ReactNode, useImperativeHandle, useRef } from 'react'
import styled from 'styled-components'

export enum InputSize {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
}

// const adornmentSizeByInputSize = {
//   [InputSize.SMALL]: 16,
//   [InputSize.MEDIUM]: 16,
//   [InputSize.LARGE]: 24,
// }

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
  hasClearOption?: boolean
  onClear?: () => void
  sizeVariant?: InputSize
  icon?: ReactNode
  className?: string
}

const ForwardedInput: React.ForwardRefRenderFunction<HTMLInputElement, InputProps> = (props, forwardRef) => {
  const {
    className,
    error,
    hasClearOption = true,
    onClear,
    sizeVariant = InputSize.MEDIUM,
    icon,
    ...htmlInputProps
  } = props

  const inputElementRef = useRef<HTMLInputElement>(null)
  useImperativeHandle(forwardRef, () => inputElementRef?.current as HTMLInputElement)

  const handleAdornmentClick = () => {
    if (inputElementRef.current) {
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set
      nativeInputValueSetter?.call(inputElementRef.current, '')

      inputElementRef.current.dispatchEvent(new Event('input', { bubbles: true }))
      inputElementRef.current.focus()
    }

    onClear && onClear()
  }

  const value = props.value ?? inputElementRef?.current?.value
  const hasValue = !!value && value.toString().length > 0
  const shouldShoeClearAdornment = hasClearOption && !props.disabled && hasValue

  return (
    <Container className={className}>
      <StyledInput {...htmlInputProps} ref={inputElementRef} />
      {hasClearOption && (
        <ClearButton onClick={handleAdornmentClick} disabled={!shouldShoeClearAdornment}>
          x
        </ClearButton>
      )}
      {icon}
      {error}
    </Container>
  )
}

export const Input = forwardRef(ForwardedInput)

const Container = styled.div`
  width: 100%;
`

const StyledInput = styled.input`
  border-radius: 5px;
`
const ClearButton = styled.button`
  background-color: red;
`

Input.defaultProps = {
  type: 'text',
}
