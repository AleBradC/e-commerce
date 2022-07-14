import styled from 'styled-components'

export const NotFoundScreen = () => {
  return (
    <Container>
      <Content> No products found </Content>
    </Container>
  )
}

const Container = styled.div`
  height: 40vh;
`

const Content = styled.div`
  font-size: 26px;
  font-family: 'Optima', sans-serif;
  color: ${props => props.theme.colors.black};
`
