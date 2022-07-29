import { useParams } from 'react-router-dom'
import styled from 'styled-components'

import { useGetProductByIdQuery } from '../../redux/api'

const ProductPage = () => {
  const { productID } = useParams()

  const { data: productInfo } = useGetProductByIdQuery({ productID })

  return (
    <Container>
      <PrincipalSection>
        <LeftContainer>
          <ProductCategory>{productInfo?.category}</ProductCategory>
          <ProductBrand>{productInfo?.brand}</ProductBrand>
          <ProductName>{productInfo?.name}</ProductName>
          {/*<ProductRating>{productInfo?.rating}</ProductRating>*/}
          <ProductGeneralDescription>{productInfo?.generalDescription}</ProductGeneralDescription>
          <ProductPrincipalBenefitsContainer>
            {productInfo?.principalBenefits.map(benefit => (
              <PrincipalBenefit key={benefit}> {benefit}</PrincipalBenefit>
            ))}
          </ProductPrincipalBenefitsContainer>
        </LeftContainer>
        <CentralContainer>
          <img src={productInfo?.carouselImages[0]} />
        </CentralContainer>
        <RightContainer>
          <ProductPrice>$ {productInfo?.price}</ProductPrice>
          <AccordionContainer>{productInfo?.description}</AccordionContainer>
        </RightContainer>
      </PrincipalSection>
    </Container>
  )
}

const Container = styled.div`
  display: flex;

  padding: 68px 10px 60px 10px;
`

const PrincipalSection = styled.div`
  display: flex;
  margin-bottom: 20px;
`

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  padding: 28px 42px 0 60px;
`

const ProductCategory = styled.div`
  margin-bottom: 28px;

  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  color: ${props => props.theme.colors.grey};
`

const ProductBrand = styled.div`
  margin-bottom: 12px;

  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  text-transform: uppercase;
  font-weight: 800;
  color: ${props => props.theme.colors.grey};
`

const ProductName = styled.div`
  font-family: 'Optima', sans-serif;
  font-size: 32px;
  letter-spacing: 1px;
  color: ${props => props.theme.colors.black};
`

// const ProductRating = styled.div``

const ProductGeneralDescription = styled.div`
  margin-top: 12px;
  margin-bottom: 12px;

  font-family: 'Montserrat', sans-serif;
  font-size: 15px;
  line-height: 1.3rem;
  color: ${props => props.theme.colors.black};
`

const ProductPrincipalBenefitsContainer = styled.ul``

const PrincipalBenefit = styled.li`
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  line-height: 1.6rem;
  font-weight: bold;
  color: ${props => props.theme.colors.black};
`

const CentralContainer = styled.div``

const RightContainer = styled.div`
  padding: 62px;
`

const ProductPrice = styled.div``
const AccordionContainer = styled.div``

export default ProductPage
