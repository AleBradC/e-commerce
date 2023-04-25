import { ReactNode } from 'react'
import styled from 'styled-components'

export interface BadgeProps {
  children: ReactNode
}

export const Badge: React.FC<BadgeProps> = ({ children }) => {
  return <Container>{children}</Container>
}

const Container = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 22px;
  bottom: 12px;

  font-family: 'Montserrat', sans-serif;
  font-size: 8px;
  font-weight: bolder;

  border-radius: 100%;
  padding: 2px 5px 2px 5px;
  background: ${props => props.theme.colors.brownLight};
  color: ${props => props.theme.colors.black};
`
