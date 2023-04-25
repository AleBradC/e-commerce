import { ReactNode } from 'react'
import styled from 'styled-components'

export interface SlideProps {
  children: ReactNode
  className?: string
}

export const Slide: React.FC<SlideProps> = ({ children, className }) => {
  return <Container className={className}>{children}</Container>
}

const Container = styled.div`
  display: inline-block;
  width: 100%;
`
