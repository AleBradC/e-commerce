import { ReactNode } from 'react'
import styled from 'styled-components'
import Loading from '../Loading/Loading'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: string | ReactNode
  className?: string
  isLoading?: boolean
}

export const Button: React.FC<ButtonProps> = ({ children, className, isLoading, ...htmlButtonProps }) => {
  return (
    <ButtonContainer className={className} {...htmlButtonProps}>
      {isLoading ? <Loading smallSpinner /> : children}
    </ButtonContainer>
  )
}

const ButtonContainer = styled.button`
  padding: 10px 25px;
  min-width: 226px;

  border: none;
  background: ${props => props.theme.colors.brown};
  color: ${props => props.theme.colors.white};
  font-family: 'Montserrat', sans-serif;
  font-weight: bolder;
  letter-spacing: 1px;

  :hover {
    background-color: ${props => props.theme.colors.brownLight};
  }

  :disabled {
    background: ${props => props.theme.colors.greyLight};
    cursor: not-allowed;
  }
`
