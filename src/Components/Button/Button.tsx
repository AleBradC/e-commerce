import styled from 'styled-components'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: string
  className?: string
}

export const Button: React.FC<ButtonProps> = ({ children, className, ...htmlButtonProps }) => {
  return (
    <ButtonContainer className={className} {...htmlButtonProps}>
      {children}
    </ButtonContainer>
  )
}

const ButtonContainer = styled.button`
  padding: 11px 25px;
  border: none;
  background: ${props => props.theme.colors.brown};
  color: ${props => props.theme.colors.white};
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
  cursor: pointer;

  :hover {
    background-color: ${props => props.theme.colors.brownLight};
  }

  :disabled {
    background: ${props => props.theme.colors.greyLight};
    cursor: not-allowed;
  }
`
