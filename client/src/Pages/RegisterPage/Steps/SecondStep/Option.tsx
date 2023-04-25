import { ReactNode } from 'react'
import styled, { css } from 'styled-components'

export interface OptionProps {
  children: string | ReactNode
  onSelect: () => void
  isSelected?: boolean
  className?: string
}

export const Option: React.FC<OptionProps> = ({ children, isSelected, className, onSelect }) => {
  return (
    <Container isSelected={isSelected} className={className} onClick={onSelect}>
      <Label isSelected={isSelected}> {children} </Label>
    </Container>
  )
}

const Container = styled.div<{ isSelected?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  cursor: pointer;

  border: 1px solid ${props => props.theme.colors.beige};
  background-color: ${props => props.theme.colors.neutralLight};
  border-radius: 6px;

  ${props =>
    props.isSelected &&
    css`
      border: 1px solid ${props => props.theme.colors.brown};
      background-color: ${props => props.theme.colors.beigeLight};
    `}
`

const Label = styled.span<{ isSelected?: boolean }>`
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  font-weight: bold;

  ${props =>
    props.isSelected &&
    css`
      color: ${props => props.theme.colors.brown};
    `}
`
