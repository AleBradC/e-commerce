import styled from 'styled-components'

export const ThirdStep = () => {
  return (
    <Container>
      <Content> Thank you ! </Content>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 40px;
`

const Content = styled.span`
  font-family: 'Montserrat', sans-serif;
  font-size: 24px;
  font-weight: bold;
`
