import { ReactNode } from 'react'
import styled from 'styled-components'

import { ProductType } from '../../helpers/types'

export interface MenuItemProps {
  children: ReactNode | ProductType | undefined | any
  onClick?: () => void
  className?: string
  checkBox?: boolean
}

export const MenuItem: React.FC<MenuItemProps> = ({ children, onClick, className }) => {
  const onClickItem = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation()
    onClick && onClick()
  }

  return (
    <MenuItemContainer className={className} onClick={onClickItem}>
      {children}
    </MenuItemContainer>
  )
}

const MenuItemContainer = styled.button`
  display: flex;
  align-items: center;
  padding: 10px;
  width: 100%;
  border: none;
  background: none;

  &:hover {
    background: ${props => props.theme.colors.beigeLight};
    border-radius: 6px;
  }
`
