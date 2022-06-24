import styled from 'styled-components'

export interface TagsProps {
  children: string | any
}

export const Tag: React.FC<TagsProps> = ({ children }) => {
  return (
    <Container>
      <Content>{children}</Content>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px 10px;
  margin-right: 4px;
  border-radius: 20px;
  border: 1px solid ${props => props.theme.colors.black};
`

const Content = styled.span`
  font-family: 'Montserrat', sans-serif;
  font-size: 10px;
  text-transform: uppercase;
  font-weight: bold;
  color: ${props => props.theme.colors.black};
`
