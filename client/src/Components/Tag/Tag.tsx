import styled from 'styled-components'
import { IconButton, IconButtonType } from '../IconButton/IconButton'

export interface TagsProps {
  children: string[] | string
  deleteTag?: () => void
  isFilterTag?: boolean
}

export const Tag: React.FC<TagsProps> = ({ children, deleteTag, isFilterTag }) => {
  return (
    <Container>
      <Content>{children}</Content>
      {isFilterTag && <StyledIconButton variant={IconButtonType.CLOSE} onClick={deleteTag} />}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 6px;
  margin-right: 4px;
  border-radius: 20px;
  border: 1px solid ${props => props.theme.colors.black};
`

const Content = styled.span`
  font-family: 'Montserrat', sans-serif;
  font-size: 12px;
  text-transform: uppercase;
  font-weight: bolder;
  color: ${props => props.theme.colors.black};
`

const StyledIconButton = styled(IconButton)`
  padding: 0;
  margin: 0 0 0 8px;
`
