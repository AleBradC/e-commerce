import styled from 'styled-components'
import { forwardRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { searchRoute } from '../../Helpers/routes'

import SearchIcon from '../../assets/icons/searchIcon.svg'

export interface SearchBarProps {
  showSearchBar: boolean
  className?: string
}

export const SearchBar = forwardRef<HTMLDivElement, SearchBarProps>(({ showSearchBar, className }, ref) => {
  const navigateTo = useNavigate()

  if (!showSearchBar) {
    return null
  }

  const onRedirect = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      navigateTo(searchRoute)
    }
  }

  return (
    <Container ref={ref} className={className} onKeyDown={onRedirect}>
      <Icon src={SearchIcon} />
      <Input placeholder="What are you looking for? " />
    </Container>
  )
})

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  background-color: ${props => props.theme.colors.beigeLight};
`

const Input = styled.input`
  padding: 8px 28px 8px 8px;
  margin-left: 6px;
  max-width: 340px;
  width: 100%;
  border: none;
  background-color: transparent;

  border-bottom: 1px solid ${props => props.theme.colors.grey2};

  &:focus {
    outline: none;
  }
`

const Icon = styled.img`
  height: 18px;
  width: 20px;
`

SearchBar.displayName = 'SearchBar'
