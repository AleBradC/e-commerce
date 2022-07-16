import { CSSProperties, forwardRef } from 'react'
import styled from 'styled-components'

import SearchIcon from '../../assets/icons/searchIcon.svg'

export interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
  position: CSSProperties
}

export const SearchBar = forwardRef<HTMLDivElement, SearchBarProps>(
  ({ position, className, ...htmlInputProps }, ref) => {
    return (
      <Container ref={ref} style={position} className={className}>
        <Icon src={SearchIcon} />
        <Input placeholder="What are you looking for? " {...htmlInputProps} />
      </Container>
    )
  }
)

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-size: 1.4rem;
  line-height: 1.29;
  padding: 12px 0 12px 0;
  border: none;

  z-index: ${props => props.theme.zIndex.others};
  background-color: ${props => props.theme.colors.butter};
`

const Input = styled.input`
  padding: 8px 28px 8px 8px;
  margin-left: 6px;
  max-width: 340px;
  width: 100%;
  border: none;
  background-color: transparent;

  &:focus {
    outline: none;
  }
`

const Icon = styled.img`
  height: 18px;
  width: 20px;
`

SearchBar.displayName = 'SearchBar'
