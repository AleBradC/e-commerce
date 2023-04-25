import { CSSProperties, forwardRef, ReactNode } from 'react'
import styled from 'styled-components'

import SkinCareImg from '../../assets/header/SkinCareImg.jpg'
import MakeUpImg from '../../assets/header/MakeUpImg.jpg'

export enum MenuImageType {
  SKINCARE = 'skinCare',
  MAKE_UP = 'makeUp',
}

export interface ExtendedHeaderProps {
  children: ReactNode
  image: MenuImageType
  position: CSSProperties
  className?: string
}

const menuImageVariant = {
  [MenuImageType.SKINCARE]: SkinCareImg,
  [MenuImageType.MAKE_UP]: MakeUpImg,
}

export const ExtendedHeader = forwardRef<HTMLDivElement, ExtendedHeaderProps>(
  ({ position, children, image, className }, ref) => {
    return (
      <ExtendedHeaderContainer ref={ref} style={position} className={className}>
        <Content>{children}</Content>
        <Image src={menuImageVariant[image]} alt="skin-care" />
      </ExtendedHeaderContainer>
    )
  }
)

const ExtendedHeaderContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  padding: 24px 0 24px 0;
  width: 100%;

  z-index: ${props => props.theme.zIndex.header};
  overflow: hidden;
  background: ${props => props.theme.colors.white};
`

const Content = styled.div`
  display: flex;
  margin-right: 30px;
  width: 340px;
`

const Image = styled.img`
  width: 140px;
  height: 160px;
`

ExtendedHeader.displayName = 'ExtendedHeader'
