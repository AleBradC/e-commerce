import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import useBreakpoint from '../../hooks/useBreakpointsHook/useBreakpoint'
import { useAddProductToCardMutation } from '../../redux/api'
import { toggleBagDrawer } from '../../redux/reducers/bagDrawerSlice'
import { useAppDispatch } from '../../redux/hooks'
import { Tag } from '../Tag/Tag'
import { Button } from '../Button/Button'
import { Rating } from '../Rating/Rating'

export interface ProductCardProps {
  id: number
  brand: string
  name: string
  tags: string[]
  imageURL: string
  hoverImageURL: string
  rating: number
  price: number
  principalBenefits: string[]
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
  principalBenefits,
  className,
}) => {
  const breakPoint = useBreakpoint()
  const dispatch = useAppDispatch()
  const isDesktop = breakPoint === 'lg' || breakPoint === 'xl'
  const navigate = useNavigate()

  const [hoveredCard, setHoveredCard] = useState(false)
  const [addProductToCard, { isLoading: addToCartIsLoading }] = useAddProductToCardMutation()

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

  const handleOpenProduct = () => {
    navigate(`/product/${id}`)
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
      {hoveredCard ? (
        <HoverProductCardContainer>
          <ProductCardHeader onClick={handleOpenProduct}>
            {principalBenefits.map(benefit => (
              <BenefitItemContainer key={benefit}>
                <BenefitItem> {benefit} </BenefitItem>
              </BenefitItemContainer>
            ))}
          </ProductCardHeader>
          <ImageContainer onClick={handleOpenProduct}>{isDesktop && <HoverImage src={hoverImageURL} />}</ImageContainer>
          <Footer>
            <StyledButton onClick={() => handleAddToCard(id)} isLoading={addToCartIsLoading}>
              ADD TO CART
            </StyledButton>
          </Footer>
        </HoverProductCardContainer>
      ) : (
        <ProductCardContainer>
          <ProductCardHeader>
            <BrandContainer>
              <BrandName> {brand} </BrandName>
            </BrandContainer>
            <ProductName> {name} </ProductName>
            <TagsContainer>
              {tags?.map(tag => (
                <Tag key={tag}> {tag} </Tag>
              ))}
            </TagsContainer>
          </ProductCardHeader>
          <ImageContainer onClick={handleOpenProduct}>
            <ProductImage src={imageURL} />
          </ImageContainer>
          <Footer>
            <StarPriceContainer>
              <StarsContainer>{rating > 0 && <Rating existingRating={rating} />}</StarsContainer>
              <Price> {price} $ </Price>
            </StarPriceContainer>
          </Footer>
        </ProductCardContainer>
      )}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 286px;
  height: 460px;
  padding: 12px 20px 20px 20px;

  cursor: pointer;
  background-color: ${props => props.theme.colors.white};
  }
`

const ProductCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`

const ProductCardHeader = styled.div`
  width: 100%;
  height: 106px;
  margin-bottom: 8px;
`

const BenefitItemContainer = styled.div`
  min-height: 18px;
  margin: 0 0 3px;
`

const BenefitItem = styled.div`
  position: relative;
  padding-left: 40px;

  font-size: 14px;
  font-family: 'Montserrat', sans-serif;
  line-height: 2;
  letter-spacing: -0.3px;

  color: ${props => props.theme.colors.black};
  background-color: ${props => props.theme.colors.white};

  &:before {
    content: '';
    position: absolute;
    display: block;
    top: 14px;
    left: 0;
    height: 1px;
    width: 30px;
    background-color: ${props => props.theme.colors.greyLight};
  }
`

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

    background: ${props => props.theme.colors.greyLight};
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
  line-height: 1.5;
  letter-spacing: -0.3px;
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
  width: 230px;
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

const HoverProductCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`

const HoverImage = styled.img`
  object-fit: contain;
  object-position: center;
  width: 100%;
  max-height: 140px;
  height: 100%;
`

const StyledButton = styled(Button)`
  width: 100%;
`
