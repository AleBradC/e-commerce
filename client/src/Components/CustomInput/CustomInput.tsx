import { forwardRef, useImperativeHandle, useRef } from 'react'
import styled, { css } from 'styled-components'

import clearIcon from '../../assets/icons/x.svg'

export enum InputSize {
  SMALL = 'SMALL',
  LARGE = 'LARGE',
}

const adornmentSizeByInputSize = {
  [InputSize.SMALL]: 16,
  [InputSize.LARGE]: 18,
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string | boolean
  sizeVariant: InputSize
  label?: string
}

export const ForwardedCustomInput: React.ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  props,
  forwardRef
) => {
  const { className, label, error, sizeVariant, ...htmlInputProps } = props

  const inputElementRef = useRef<HTMLInputElement>(null)
  useImperativeHandle(forwardRef, () => inputElementRef.current as HTMLInputElement)

  const handleAdornmentClick = () => {
    if (inputElementRef.current) {
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set
      nativeInputValueSetter?.call(inputElementRef.current, '')

      inputElementRef.current.dispatchEvent(new Event('input', { bubbles: true }))
      inputElementRef.current.focus()
    }
  }

  const value = props.value ?? inputElementRef?.current?.value
  const hasValue = !!value && value.toString().length > 0

  return (
    <Container className={className}>
      <Label>{label}</Label>
      <InputContainer>
        <StyledInput
          {...htmlInputProps}
          ref={inputElementRef}
          hasError={!!error}
          hasAdornment={hasValue}
          sizeVariant={sizeVariant}
          shouldShowClearAdornment={hasValue}
          hasValue={hasValue}
        />

        {hasValue && (
          <ClearButton
            data-testid="clear"
            onClick={handleAdornmentClick}
            type="button"
            sizeVariant={sizeVariant}
            disabled={!hasValue}
          >
            <XIcon src={clearIcon} />
          </ClearButton>
        )}
      </InputContainer>

      <InputMessagesContainer>
        <ErrorText>{error}</ErrorText>
      </InputMessagesContainer>
    </Container>
  )
}

export const CustomInput = forwardRef(ForwardedCustomInput)

const Container = styled.div`
  width: 100%;
`

const Label = styled.div`
  padding-bottom: 8px;
  font-size: 14px;
  font-family: 'Montserrat', sans-serif;

  color: ${props => props.theme.colors.greyDark};
`

const InputContainer = styled.div`
  position: relative;
  width: 100%;
  z-index: 0;
`

const adornmentRightStyle = css<{ sizeVariant: InputSize }>`
  height: ${props => `${adornmentSizeByInputSize[props.sizeVariant]}px`};
  width: ${props => `${adornmentSizeByInputSize[props.sizeVariant]}px`};

  position: absolute;
  transform: translate(0, -50%);
  top: 50%;

  right: ${props => props.sizeVariant === InputSize.SMALL && '8px'};
  right: ${props => props.sizeVariant === InputSize.LARGE && '10px'};
`

const ClearButton = styled.button<{ sizeVariant: InputSize }>`
  ${adornmentRightStyle};
  display: flex;
  transition: opacity 0.2s;
  background-color: transparent;
  border: none;

  opacity: 0;

  :disabled {
    z-index: ${props => props.theme.zIndex.negative};
  }

  :enabled:hover,
  :enabled:active,
  :enabled:focus {
    opacity: 1;
  }

  :focus-visible {
    outline: 2px solid ${props => props.theme.colors.brown};
  }
`

const StyledInput = styled.input<{
  hasError: boolean
  sizeVariant: InputSize
  hasAdornment: boolean
  shouldShowClearAdornment: boolean
  hasValue: boolean
}>`
  width: 100%;

  padding: ${props => props.sizeVariant === InputSize.SMALL && '12px 0 12px 6px'};
  padding: ${props => props.sizeVariant === InputSize.LARGE && '12px 0 12px 16px'};

  transition: border-color 0.2s, background-color 0.2s;
  background-color: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.brown};

  outline: none;
  border: 1px solid ${props => props.theme.colors.grey4};
  caret-color: ${props => props.theme.colors.brown};

  ::placeholder {
    font-family: 'Montserrat', sans-serif;
  }

  :not(:disabled) {
    :hover {
      border-color: ${props => !props.hasError && props.theme.colors.brownLight};
    }

    :focus {
      border-color: ${props => props.theme.colors.brown};
    }

    :focus-within ~ ${ClearButton}, :hover ~ ${ClearButton} {
      opacity: ${props => (props.shouldShowClearAdornment ? 1 : 0)};
    }

    ${props =>
      props.hasError &&
      css`
        border-color: ${props => props.theme.colors.red};
      `}
  }

  :disabled {
    background-color: transparent;
    cursor: not-allowed;
  }

  &[type='number']::-webkit-outer-spin-button,
  &[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
`

const InputMessagesContainer = styled.div`
  display: flex;
`

const ErrorText = styled.span`
  flex: 1;
  min-height: 16px;
  margin-top: 4px;
  margin-bottom: 12px;

  font-family: 'Montserrat', sans-serif;
  color: ${props => props.theme.colors.red};
  font-size: 12px;
`

const XIcon = styled.img`
  width: 16px;
  height: 16px;
`

CustomInput.defaultProps = {
  type: 'text',
}
