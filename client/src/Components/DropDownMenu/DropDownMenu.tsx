import { forwardRef, Key, useRef, useState } from 'react'
import { flip, shift, useFloating } from '@floating-ui/react-dom'
import styled from 'styled-components'

import useClickOutSide from '../../hooks/useClickOutSide'
import { Menu } from '../Menu/Menu'
import { MenuItem } from '../MenuItem/MenuItem'

export interface OptionsType {
  value: string | number
  label: string
}

export interface DropDownMenuProps {
  onToggleDropDown?: (state: boolean) => void
  options: OptionsType[]
  onSelected: (option: OptionsType['value']) => void
  selected: OptionsType['value']
  placeholder: string
  className?: string
}

export const DropDownMenu = forwardRef<HTMLInputElement, DropDownMenuProps>(
  ({ onToggleDropDown, options, onSelected, selected, placeholder, className }, ref) => {
    const [showDropDown, setShowDropDown] = useState(false)

    const { x, y, reference, floating, strategy } = useFloating({
      placement: 'bottom',
      middleware: [shift(), flip()],
    })

    const clickRef = useRef<HTMLDivElement>(null)

    useClickOutSide(clickRef, () => {
      setShowDropDown(false)
    })

    const handleChangeSelectedOption = (option: OptionsType['value']) => {
      onSelected && onSelected(option)
      setShowDropDown(false)
    }

    const toggleDropDown = () => {
      onToggleDropDown && onToggleDropDown(!showDropDown)
      setShowDropDown(!showDropDown)
    }

    const selectedOption = options.find(({ value }) => value === selected)

    return (
      <MainContainer ref={clickRef}>
        <SelectedContainer ref={ref} className={className}>
          <Container ref={reference} onClick={toggleDropDown}>
            {selectedOption ? selectedOption.label : placeholder}
          </Container>

          <Menu ref={floating} showMenu={showDropDown} position={{ position: strategy, top: y ?? '', left: x ?? '' }}>
            {options.map(({ value, label }) => (
              <MenuItem key={value as Key} onClick={() => handleChangeSelectedOption(value)}>
                {label}
              </MenuItem>
            ))}
          </Menu>
        </SelectedContainer>
      </MainContainer>
    )
  }
)

const MainContainer = styled.div``

const SelectedContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`

const Container = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-family: 'Montserrat', sans-serif;

  background: none;
  border: none;
`

DropDownMenu.displayName = 'DropDownMenu'
