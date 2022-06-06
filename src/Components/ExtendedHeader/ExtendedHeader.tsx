import {CSSProperties, forwardRef, ReactNode} from "react";

import styled from "styled-components";

import SkinCareImg from '../../assets/SkinCareImg.jpg'
import MakeUpImg from '../../assets/MakeUpImg.jpg'

export enum MenuImageType {
    SKINCARE = 'skinCare',
    MAKE_UP = 'makeUp'
}

export interface ExtendedHeaderProps {
    children: ReactNode
    image: MenuImageType
    position: CSSProperties
}

const menuImageVariant = {
    [MenuImageType.SKINCARE]: SkinCareImg,
    [MenuImageType.MAKE_UP]: MakeUpImg
}

export const ExtendedHeader = forwardRef<HTMLDivElement, ExtendedHeaderProps>(({ position, children, image }, ref) => {

    return (
            <ExtendedHeaderContainer ref={ref} style={position}>
                <SectionContainer>
                    {children}
                </SectionContainer>
                <Image src={menuImageVariant[image]} alt="skin-care" />
            </ExtendedHeaderContainer>
    )
})

const ExtendedHeaderContainer = styled.div`
  z-index: 1000;
  overflow: hidden;
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  padding: 24px;
  width: 100%;
  
  background: ${props => props.theme.colors.white};
`

const SectionContainer = styled.div`
  display: flex;
`

const Image = styled.img`
  width: 140px;
  height: 160px;
`