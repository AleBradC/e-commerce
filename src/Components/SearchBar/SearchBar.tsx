import styled from "styled-components";
import { forwardRef } from "react";

import SearchIcon from '../../assets/icons/searchIcon.svg'

export interface SearchBarProps {
    showSearchBar: boolean
}

export const SearchBar = forwardRef<HTMLDivElement, SearchBarProps>(({showSearchBar}, ref) => {

    if (!showSearchBar) {
        return null
    }

    return (
        <Container ref={ref}>
            <Input placeholder='What are you looking for? '/>
        </Container>
    )
})

const Container = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  width: 100%;
  padding: 4px;
  background-color: ${props => props.theme.colors.beigeLight};
`

const Input = styled.input`
  border: none;
  background-color: transparent;
  padding: 8px 28px 8px 8px;
  max-width: 340px;
  width: 100%;
  
  border-bottom: 1px solid ${props => props.theme.colors.grey2};
  
  &:focus {
    outline: none;
  }
`

const Icon = styled.img`

`