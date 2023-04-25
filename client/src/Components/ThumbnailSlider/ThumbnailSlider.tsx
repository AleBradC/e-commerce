import React, { useState } from 'react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Thumbs } from 'swiper'
import styled, { css } from 'styled-components'

import RightArrowImg from '../../assets/icons/right-arrow.png'
import LeftArrowImg from '../../assets/icons/left-arrow.png'

export interface ThumbnailSliderProps {
  thumbnailSliders: [] | undefined
}

export const ThumbnailSlider: React.FC<ThumbnailSliderProps> = ({ thumbnailSliders }) => {
  const [activeThumb, setActiveThumb] = useState(0)

  const showArrows = thumbnailSliders && thumbnailSliders.length >= 2

  const handleChangeSlider = (index: number) => {
    setActiveThumb(index)
  }

  const handleUpdateThumbIndex = (newIndex: number) => {
    if (!thumbnailSliders) {
      return null
    }

    if (newIndex < 0) {
      newIndex = thumbnailSliders.length - 1
    } else if (newIndex >= thumbnailSliders.length) {
      newIndex = 0
    }

    setActiveThumb(newIndex)
  }

  return (
    <Container>
      <Body>
        <Slide style={{ transform: `translateX(${-activeThumb * 100}%)` }}>
          {thumbnailSliders?.map((slide, index) => (
            <SliderImage src={slide} key={index} />
          ))}
        </Slide>
      </Body>

      <Footer>
        {showArrows && (
          <LeftArrow onClick={() => handleUpdateThumbIndex(activeThumb - 1)}>
            <ArrowImg src={LeftArrowImg} />
          </LeftArrow>
        )}

        <Swiper grabCursor={true} slidesPerView={4} modules={[Navigation, Thumbs]}>
          <SliderPreviewContainer>
            {thumbnailSliders?.map((slide, index) => (
              <SwiperSlide
                key={index}
                style={
                  thumbnailSliders && thumbnailSliders?.length > 3
                    ? { transform: `translateX(${-activeThumb * 100}%)`, transition: 'transform 500ms ease-in-out' }
                    : {}
                }
              >
                <SliderPreviewImageContainer isActive={activeThumb === index}>
                  <SliderPreviewImage src={slide} onClick={() => handleChangeSlider(index)} />
                </SliderPreviewImageContainer>
              </SwiperSlide>
            ))}
          </SliderPreviewContainer>
        </Swiper>
        {showArrows && (
          <RightArrow onClick={() => handleUpdateThumbIndex(activeThumb + 1)}>
            <ArrowImg src={RightArrowImg} />
          </RightArrow>
        )}
      </Footer>
    </Container>
  )
}

const Container = styled.div`
  margin: 0 auto;
  overflow: hidden;

  cursor: pointer;
`

const Body = styled.div`
  white-space: nowrap;
  transition: transform 0.3s;
`

const Slide = styled.div`
  display: inline-block;
  width: 100%;

  transition: transform 500ms ease-in-out;
`

const SliderImage = styled.img`
  width: 540px;
  height: 560px;
`

const Footer = styled.div`
  position: relative;
  margin: auto;
  bottom: 42px;
  max-width: 360px;
  width: 100%;
`

const SliderPreviewContainer = styled.div`
  display: flex;
  width: 100%;
  overflow: hidden;
`

const SliderPreviewImageContainer = styled.div<{ isActive: boolean }>`
  width: 70px;
  height: 70px;

  cursor: pointer;
  overflow: hidden;
  border: 1px solid transparent;
  transition: transform 500ms ease-in-out;

  ${props =>
    !props.isActive &&
    css`
      &:hover {
        border: 1px solid ${props => props.theme.colors.greyLight};
      }
    `}

  ${props =>
    props.isActive &&
    css`
      border: 1px solid ${props => props.theme.colors.black};
    `}
`

const SliderPreviewImage = styled.img`
  display: block;
  width: 70px;
  height: 70px;

  object-fit: cover;
`

const ArrowImg = styled.img`
  width: 30px;
  height: 30px;
`

const LeftArrow = styled.button`
  position: absolute;
  top: 24px;
  left: -58px;

  z-index: 1000;
  border: none;
  background: none;
`

const RightArrow = styled.button`
  position: absolute;
  top: 24px;
  right: -58px;

  z-index: 1000;
  border: none;
  background: none;
`
