import styled from 'styled-components'

export const NotFoundScreen = () => {
  return (
    <Container>
      <Content> No products found </Content>
    </Container>
  )
}

const Container = styled.div`
  height: 100%;
`

const Content = styled.span`
  font-size: 26px;
  font-family: 'Tiro Telugu', serif;
  color: ${props => props.theme.colors.black};
`
