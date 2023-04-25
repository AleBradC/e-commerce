import { ReactNode } from 'react'
import styled from 'styled-components'

export interface OptionsMenuContainerProps {
  title?: string
  children: ReactNode
  className?: string
}

export const SectionMenu: React.FC<OptionsMenuContainerProps> = ({ title, children, className }) => {
  return (
    <Container className={className}>
      <Title> {title} </Title>
      <MenuItemsContainer>{children}</MenuItemsContainer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 180px;
  min-width: 140px;

  background: ${props => props.theme.colors.white};
`

const Title = styled.span`
  padding: 0;
  margin-bottom: 20px;

  text-align: start;
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  font-weight: bolder;
  color: ${props => props.theme.colors.greyDarker};
`

const MenuItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
`
