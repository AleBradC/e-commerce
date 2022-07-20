import { useCallback, useState } from 'react'
import styled from 'styled-components'

import useBreakpoint from '../../hooks/useBreakpointsHook/useBreakpoint'
import { useAddProductToCardMutation } from '../../redux/api'
import { toggleBagDrawer } from '../../redux/reducers/bagDrawerSlice'
import { useAppDispatch } from '../../redux/hooks'
import { Tag } from '../Tag/Tag'
import { Button } from '../Button/Button'

export interface ProductCardProps {
  id: number
  brand: string
  name: string
  tags: string[]
  imageURL: string
  hoverImageURL: string
  rating: number
  price: number
  className?: string
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  brand,
  name,
  tags,
  imageURL,
  hoverImageURL,
  rating,
  price,
  className,
}) => {
  const breakPoint = useBreakpoint()
  const dispatch = useAppDispatch()
  const isDesktop = breakPoint === 'lg' || breakPoint === 'xl'

  const [hoveredCard, setHoveredCard] = useState(false)
  const [addProductToCard] = useAddProductToCardMutation()

  const handleHover = () => {
    if (isDesktop) {
      setHoveredCard(true)
    }
  }

  const handleRemoveHover = () => {
    if (isDesktop) {
      setHoveredCard(false)
    }
  }

  const handleAddToCard = useCallback(
    async (productId: number) => {
      await addProductToCard({
        id: productId,
        brand: brand,
        name: name,
        imageURL: imageURL,
        price: price,
        quantity: 1,
      })

      dispatch(toggleBagDrawer(true))
    },
    [addProductToCard, brand, dispatch, imageURL, name, price]
  )

  return (
    <Container onMouseEnter={handleHover} onMouseLeave={handleRemoveHover} className={className}>
      <Header>
        {!hoveredCard && (
          <HoverHeader>
            <BrandContainer>
              <BrandName> {brand} </BrandName>
            </BrandContainer>
            <ProductName> {name} </ProductName>
            <TagsContainer>
              {tags?.map(tag => (
                <Tag key={tag}> {tag} </Tag>
              ))}
            </TagsContainer>
          </HoverHeader>
        )}
      </Header>
      <ImageContainer>
        {hoveredCard && isDesktop ? <HoverImage src={hoverImageURL} /> : <ProductImage src={imageURL} />}
      </ImageContainer>
      <Footer>
        {hoveredCard ? (
          <StyledButton onClick={() => handleAddToCard(id)}> ADD TO CART </StyledButton>
        ) : (
          <StarPriceContainer>
            <StarsContainer> {rating} </StarsContainer>
            <Price> {price} $ </Price>
          </StarPriceContainer>
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
  margin: 10px;

  cursor: pointer;
  background-color: ${props => props.theme.colors.white};
  }
`

const Header = styled.div`
  width: 100%;
  max-height: 106px;
  padding: 8px;
`

const HoverHeader = styled.div``

const BrandContainer = styled.div`
  position: relative;
  min-height: 18px;
  margin: 0 0 3px;

  &:before {
    content: '';
    position: absolute;
    top: 8px;
    right: 0;
    left: 0;
    height: 1px;

    background-color: ${props => props.theme.colors.greyLight};
  }
`

const BrandName = styled.div`
  position: relative;
  display: inline-block;
  background-color: ${props => props.theme.colors.white};
  padding-right: 8px;

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

const StarPriceContainer = styled.div`
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
