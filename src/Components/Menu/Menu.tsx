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
  padding: 4px;
  min-width: 212px;
  z-index: 100;
`

Menu.displayName = 'Menu'
