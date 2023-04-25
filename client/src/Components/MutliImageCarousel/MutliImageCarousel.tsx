import React, { ReactNode, useRef } from 'react'
import styled, { css } from 'styled-components'
import { ProductType } from '../../helpers/types'

export interface MutliImageCarouselProps {
  children: ReactNode
  multiImageCarouselActiveIndex: number
  setMultiImageCarouselActiveIndex: (index: number) => void
  sliders: ProductType[] | undefined
}

export const MutliImageCarousel: React.FC<MutliImageCarouselProps> = ({
  children,
  sliders,
  setMultiImageCarouselActiveIndex,
  multiImageCarouselActiveIndex,
}) => {
  const multiImageCarouselRef = useRef<HTMLDivElement>(null)

  return (
    <Container>
      <InnerContainer ref={multiImageCarouselRef}>{children}</InnerContainer>

      <Footer>
        {sliders?.map((_, index) => (
          <SlideProgressBar
            key={index}
            onClick={() => setMultiImageCarouselActiveIndex(index)}
            isActive={multiImageCarouselActiveIndex === index}
          />
        ))}
      </Footer>
    </Container>
  )
}

const Container = styled.div`
  max-width: 1240px;
  width: 100%;
  min-height: 300px;
  margin: auto;
`

const InnerContainer = styled.div`
  display: flex;
  width: 100%;
  overflow: hidden;
`

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 24px;
  width: 100%;
`

const SlideProgressBar = styled.button<{ isActive: boolean }>`
  display: inline-block;
  margin: 15px 7px 0;
  padding: 0;
  height: 4px;
  width: 6%;

  border-radius: 50px;
  border: none;

  background-color: ${props => props.theme.colors.white2};
  ${props =>
    props.isActive &&
    css`
      background-color: ${props => props.theme.colors.brown};
    `};
`
