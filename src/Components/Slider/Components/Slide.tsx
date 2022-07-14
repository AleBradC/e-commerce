import { ReactNode } from 'react'
import styled from 'styled-components'

export interface SlideProps {
  children: ReactNode
}

export const Slide: React.FC<SlideProps> = ({ children }) => {
  return <Container>{children}</Container>
}

const Container = styled.div`
  display: inline-block;
  width: 100%;
`
