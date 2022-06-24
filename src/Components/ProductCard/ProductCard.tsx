import { useState } from 'react'
import styled from 'styled-components'

import { Tag } from '../Tag/Tag'
import { Button } from '../Button/Button'

export interface ProductCardProps {
  brand: string
  name: string
  tags: string[]
  imageURL: string
  hoverImageURL: string
  rating: number
  price: number
}

export const ProductCard: React.FC<ProductCardProps> = ({
  brand,
  name,
  tags,
  imageURL,
  hoverImageURL,
  rating,
  price,
}) => {
  const [hoveredCard, setHoveredCard] = useState(false)

  const handleHover = () => {
    setHoveredCard(true)
  }

  const handleRemoveHover = () => {
    setHoveredCard(false)
  }

  return (
    <Container onMouseEnter={handleHover} onMouseLeave={handleRemoveHover}>
      <Header>
        {!hoveredCard && (
          <>
            <BrandContainer>
              <BrandName> {brand} </BrandName>
            </BrandContainer>
            <ProductName> {name} </ProductName>
            <TagsContainer>
              {tags?.map((tag, index) => (
                <Tag key={index}> {tag} </Tag>
              ))}
            </TagsContainer>
          </>
        )}
      </Header>
      <ImageContainer>
        {hoveredCard ? <HoverImage src={hoverImageURL} /> : <ProductImage src={imageURL} />}
      </ImageContainer>
      <Footer>
        {hoveredCard ? (
          <StyledButton> ADD TO CART </StyledButton>
        ) : (
          <>
            <StarsContainer> {rating} </StarsContainer>
            <Price> {price} $ </Price>
          </>
        )}
      </Footer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 286px;
  width: 100%;
  padding: 12px 20px 20px 20px;
  margin: 0 auto;

  cursor: pointer;
  background-color: ${props => props.theme.colors.white};
`

const Header = styled.div`
  width: 100%;
  max-height: 106px;
  padding: 8px;
`

const BrandContainer = styled.div`
  margin-bottom: 6px;
`

const BrandName = styled.span`
  position: relative;
  font-family: 'Montserrat', sans-serif;
  font-weight: bolder;
  font-size: 14px;
  line-height: 1.29;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: ${props => props.theme.colors.grey4};
`

const ProductName = styled.span`
  font-weight: bolder;
  font-size: 16px;
  font-family: 'Montserrat', sans-serif;
  color: ${props => props.theme.colors.black};
`

const TagsContainer = styled.div`
  display: flex;
  padding: 8px 8px 8px 0;
`

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 266px;
  width: 100%;
  margin: auto auto 10px;
`

const ProductImage = styled.img`
  width: 240px;
  height: 240px;
  object-fit: contain;
  object-position: center;
`

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

const StarsContainer = styled.div``

const Price = styled.span`
  font-weight: bolder;
  font-size: 16px;
  font-family: 'Montserrat', sans-serif;
  color: ${props => props.theme.colors.black};
`

const HoverImage = styled.img`
  object-fit: contain;
  object-position: center;
  width: 140px;
  height: 140px;
`

const StyledButton = styled(Button)`
  width: 100%;
`
