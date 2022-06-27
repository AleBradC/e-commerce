import { CSSProperties, forwardRef, ReactNode } from 'react'
import styled from 'styled-components'

export interface MenuProps {
  showMenu: boolean
  children: ReactNode
  className?: string
  position?: CSSProperties
}

export const Menu = forwardRef<HTMLDivElement, MenuProps>(({ showMenu, children, className, position }, ref) => {
  if (!showMenu) {
    return null
  }

  return (
    <MenuContainer style={position} ref={ref} className={className}>
      {children}
    </MenuContainer>
  )
})

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 6px 20px 6px;
  width: 200px;
  max-height: 30rem;
  overflow-x: hidden;
  overflow-y: auto;
  border: 1px solid ${props => props.theme.colors.beigeLight};
  background-color: ${props => props.theme.colors.white};
  z-index: 100;
`

Menu.displayName = 'Menu'
