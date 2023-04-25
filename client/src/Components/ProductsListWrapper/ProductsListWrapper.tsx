import { ReactNode } from 'react'
import styled from 'styled-components'

export interface ProductsListWrapperProps {
  children: ReactNode
}

export const ProductsListWrapper: React.FC<ProductsListWrapperProps> = ({ children }) => {
  return <Container>{children}</Container>
}

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(286px, 1fr));
  grid-gap: 60px;
  max-width: 1360px;
  width: 100%;
  margin: 0 auto;
`
