import { useCallback, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled, { css } from 'styled-components'

import { useAddProductToCardMutation, useGetProductByIdQuery } from '../../redux/api'

import { useAppDispatch } from '../../redux/hooks'
import { toggleBagDrawer } from '../../redux/reducers/bagDrawerSlice'
import { Rating } from '../../components/Rating/Rating'
import { Tag } from '../../components/Tag/Tag'
import { Button } from '../../components/Button/Button'
import Loading from '../../components/Loading/Loading'
import CheckIcon from '../../assets/icons/checkbox-icon.png'
import { Accordion } from '../../components/Accordion/Accordion'
import { ThumbnailSlider } from '../../components/ThumbnailSlider/ThumbnailSlider'
import { RatingReviewSection } from './Components/RatingReviewSection'
import { AccordionType } from '../../helpers/types'

const ProductPage = () => {
  const { id } = useParams() as { id: string }
  const dispatch = useAppDispatch()

  const {
    data: productInfo,
    isLoading: productInfoIsLoading,
    isFetching: productInfoIsFetching,
  } = useGetProductByIdQuery({ id })
  const [addProductToCard, { isLoading: addProductToCardIsLoading }] = useAddProductToCardMutation()

  const [isDescriptionAccordionExpended, setIsDescriptionAccordionExpended] = useState(false)
  const [isIngredientsAccordionExpended, setIsIngredientsDescriptionAccordionExpended] = useState(false)
  const [quantity, setQuantity] = useState(0)
  const [showStickyFooter, setShowStickyFooter] = useState(false)

  const ingredientListRef = useRef<null | HTMLDivElement>(null)

  useEffect(() => {
    if (!productInfo) {
      return
    }

    setQuantity(productInfo?.quantity)
  }, [productInfo])

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        setShowStickyFooter(true)
      } else {
        setShowStickyFooter(false)
      }
    })
  }, [])

  const handleToggleAccordion = (accordionName: string) => {
    switch (accordionName) {
      case AccordionType.DESCRIPTION:
        setIsDescriptionAccordionExpended(!isDescriptionAccordionExpended)
        setIsIngredientsDescriptionAccordionExpended(false)
        break
      case AccordionType.INGREDIENTS:
        setIsIngredientsDescriptionAccordionExpended(!isIngredientsAccordionExpended)
        setIsDescriptionAccordionExpended(false)
    }
  }

  const handleIncreaseQuantity = () => {
    setQuantity(prev => prev + 1)
  }

  const handleDecreaseQuantity = () => {
    setQuantity(prev => prev - 1)
  }

  const handleRedirectToIngredient = () => {
    ingredientListRef.current?.scrollIntoView({ behavior: 'smooth' })

    setIsIngredientsDescriptionAccordionExpended(true)
  }

  const handleAddToCart = useCallback(async () => {
    if (!productInfo) {
      return null
    }

    await addProductToCard({
      id: productInfo?.id,
      brand: productInfo?.brand,
      name: productInfo?.name,
      imageURL: productInfo?.imageURL,
      price: productInfo?.price,
      quantity: quantity,
    })

    dispatch(toggleBagDrawer(true))
  }, [addProductToCard, dispatch, productInfo, quantity])

  if (productInfoIsLoading || productInfoIsFetching) {
    return <Loading smallSpinner />
  }

  return (
    <Container ref={ingredientListRef}>
      <PrincipalSection>
        <LeftContainer>
          <ProductCategory>{productInfo?.category}</ProductCategory>
          <ProductBrand>{productInfo?.brand}</ProductBrand>
          <ProductName>{productInfo?.name}</ProductName>
          <RatingContainer>
            <Rating existingRating={productInfo?.rating} />
            <ReviewButton> {productInfo && productInfo?.rating > 0 ? '1 Review' : 'Write a review'} </ReviewButton>
          </RatingContainer>
          <ProductGeneralDescription>{productInfo?.generalDescription}</ProductGeneralDescription>
          {productInfo?.principalBenefits.map(benefit => (
            <PrincipalBenefit key={benefit}>
              <Icon src={CheckIcon} />
              {benefit}
            </PrincipalBenefit>
          ))}
        </LeftContainer>

        <CentralContainer>
          <ThumbnailSlider thumbnailSliders={productInfo?.carouselImages} />
        </CentralContainer>
        <RightContainer>
          <ProductPrice>$ {productInfo?.price}</ProductPrice>
          <ActionsContainer>
            <InputContainer>
              <DecreaseBtn onClick={handleDecreaseQuantity}> - </DecreaseBtn>
              <Quantity> {quantity} </Quantity>
              <IncreaseBtn onClick={handleIncreaseQuantity}> + </IncreaseBtn>
            </InputContainer>
            <StyledButton isLoading={addProductToCardIsLoading} onClick={handleAddToCart}>
              ADD TO CART
            </StyledButton>
          </ActionsContainer>
          <AccordionContainer>
            <Accordion
              summary={AccordionType.DESCRIPTION}
              content={productInfo?.description}
              isExpended={isDescriptionAccordionExpended}
              toggleAccordion={() => handleToggleAccordion(AccordionType.DESCRIPTION)}
            />
            <Accordion
              summary={AccordionType.INGREDIENTS}
              content={productInfo?.ingredients}
              isExpended={isIngredientsAccordionExpended}
              toggleAccordion={() => handleToggleAccordion(AccordionType.INGREDIENTS)}
            />
          </AccordionContainer>
          <TagsContainer>
            {productInfo?.tags?.map(tag => (
              <Tag key={tag}> {tag} </Tag>
            ))}
          </TagsContainer>
        </RightContainer>
      </PrincipalSection>

      {!!productInfo?.benefitsSection && (
        <BenefitsSection>
          {!!productInfo?.benefitsSection?.image && <BenefitsSectionImg src={productInfo?.benefitsSection?.image} />}
          <BenefitsSectionContainer>
            <BenefitsSectionTitle>{productInfo?.benefitsSection?.information?.title}</BenefitsSectionTitle>
            <BenefitsSectionContent>
              {productInfo?.benefitsSection?.information?.content.map(item => (
                <BenefitsSectionContentItem key={item}>{item}</BenefitsSectionContentItem>
              ))}
            </BenefitsSectionContent>
          </BenefitsSectionContainer>
        </BenefitsSection>
      )}

      {!!productInfo?.quotes && (
        <QuotesSection>
          <QuotesSectionTitle> {productInfo?.quotes?.title} </QuotesSectionTitle>
          <QuotesSectionContent> {productInfo?.quotes?.content} </QuotesSectionContent>
        </QuotesSection>
      )}

      {!!productInfo?.howToUseSection && (
        <HowToUseSection>
          {productInfo?.howToUseSection?.image && <HowToUseSectionImg src={productInfo?.howToUseSection?.image} />}
          <HowToUseSectionContainer>
            <HowToUseSectionTitle>{productInfo?.howToUseSection?.information?.title}</HowToUseSectionTitle>
            <HowToUseSectionContent>
              {productInfo?.howToUseSection?.information?.content?.map(item => (
                <HowToUseSectionItem key={item}> {item} </HowToUseSectionItem>
              ))}
            </HowToUseSectionContent>
          </HowToUseSectionContainer>
        </HowToUseSection>
      )}

      {!!productInfo?.keyIngredientsSection?.information?.content && (
        <KeyIngredientsSection>
          <KeyIngredientsSectionContainer>
            <KeyIngredientsSectionTitle>
              {productInfo?.keyIngredientsSection?.information?.title}
            </KeyIngredientsSectionTitle>
            <KeyIngredientsSectionContent>
              {productInfo?.keyIngredientsSection?.information?.content?.map(item => (
                <KeyIngredientsSectionItem key={item}>{item}</KeyIngredientsSectionItem>
              ))}
            </KeyIngredientsSectionContent>
            <ListOfIngredientsButton onClick={handleRedirectToIngredient}>
              FULL LIST OF INGREDIENTS
            </ListOfIngredientsButton>
          </KeyIngredientsSectionContainer>
          {!!productInfo?.keyIngredientsSection?.image && (
            <KeyIngredientsSectionImg src={productInfo?.keyIngredientsSection?.image} />
          )}
        </KeyIngredientsSection>
      )}

      {!!productInfo?.clinicalResultsSection && (
        <ClinicalResultsSection>
          {!!productInfo?.clinicalResultsSection?.image && (
            <ClinicalResultsImg src={productInfo?.clinicalResultsSection?.image} />
          )}
          <ClinicalResultsContainer>
            <ClinicalResultsTitle>{productInfo?.clinicalResultsSection?.information?.title}</ClinicalResultsTitle>
            <ClinicalResultsContent>
              {productInfo?.clinicalResultsSection?.information?.content.map(item => (
                <ClinicalResultsItem key={item}> {item} </ClinicalResultsItem>
              ))}
            </ClinicalResultsContent>
          </ClinicalResultsContainer>
        </ClinicalResultsSection>
      )}

      <ReviewsContainer>
        <RatingReviewSection productInfo={productInfo} />
      </ReviewsContainer>

      <StickyFooter isVisible={showStickyFooter}>
        <StickyFooterProductInfoContainer>
          <StickyFooterProductBrand>{productInfo?.brand}</StickyFooterProductBrand>
          <StickyFooterProductName>{productInfo?.name}</StickyFooterProductName>
        </StickyFooterProductInfoContainer>

        <StickyFooterButtonContainer>
          <StyledStickyFooterButton isLoading={addProductToCardIsLoading} onClick={handleAddToCart}>
            ADD TO CART
            <StickyFooterPrice> ${productInfo?.price} </StickyFooterPrice>
          </StyledStickyFooterButton>
        </StickyFooterButtonContainer>
      </StickyFooter>
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 60px;
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
  max-width: 29.5%;
  width: 29.5%;
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

const RatingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 20px 0 20px 0;
`

const ReviewButton = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 12px;
  margin-left: 8px;

  cursor: pointer;
  text-decoration: underline;

  :hover {
    color: ${props => props.theme.colors.brownLight};
  }
`

const ProductGeneralDescription = styled.div`
  margin-top: 12px;
  margin-bottom: 12px;

  font-family: 'Montserrat', sans-serif;
  font-size: 15px;
  line-height: 1.3rem;
  color: ${props => props.theme.colors.black};
`

const PrincipalBenefit = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 4px 0 4px 0;

  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  line-height: 1.6rem;
  font-weight: bold;
  color: ${props => props.theme.colors.black};
`

const Icon = styled.img`
  width: 14px;
  height: 14px;

  margin-right: 6px;
  margin-top: 6px;
`

const CentralContainer = styled.div`
  max-width: 540px;
`

const RightContainer = styled.div`
  width: 500px;
  padding: 62px;
`

const ProductPrice = styled.div`
  font-family: 'Optima', sans-serif;
  font-size: 24px;
`

const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 0 12px 0;
`

const AccordionContainer = styled.div`
  width: 100%;
`

const StyledButton = styled(Button)`
  width: 100%;
`

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px;
  margin-right: 6px;
  max-width: 87px;
  width: 100%;

  border: 1px solid ${props => props.theme.colors.black};
`

const IncreaseBtn = styled.button`
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;

  color: ${props => props.theme.colors.black};
  background: none;
  border: none;
`
const Quantity = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 18px;

  color: ${props => props.theme.colors.black};
`

const DecreaseBtn = styled.button`
  font-family: 'Montserrat', sans-serif;
  font-size: 18px;

  color: ${props => props.theme.colors.black};
  background: none;
  border: none;
`

const TagsContainer = styled.div`
  display: flex;
  padding: 30px 6px 12px 0;
`

const BenefitsSection = styled.div`
  display: flex;
  padding-top: 40px;
`

const BenefitsSectionImg = styled.img`
  object-fit: cover;
  object-position: center;

  width: 935px;
  height: 600px;
`

const BenefitsSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  max-width: 33.8%;
  flex-basis: 33.8%;
  padding-left: 49px;
`

const BenefitsSectionTitle = styled.div`
  font-family: 'Optima', sans-serif;
  font-size: 36px;
`

const BenefitsSectionContent = styled.div`
  margin-top: 32px;
`

const BenefitsSectionContentItem = styled.div`
  position: relative;
  padding-left: 45px;
  margin-bottom: 31px;

  font-family: 'Montserrat', sans-serif;
  font-size: 16px;

  &:before {
    content: '';
    position: absolute;
    top: 10px;
    left: 0;
    width: 30px;
    background: ${props => props.theme.colors.greyDark};
    height: 1px;
  }
`

const QuotesSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 872px;
  width: 100%;
  margin: 0 auto;
  padding: 75px 20px;
`

const QuotesSectionTitle = styled.div`
  font-family: 'Optima', sans-serif;
  font-size: 36px;
  padding: 12px;
`

const QuotesSectionContent = styled.div`
  font-family: 'Optima', sans-serif;
  font-size: 32px;
  text-align: center;
  padding: 12px;
`

const HowToUseSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding-top: 40px;
  width: 100%;
`

const HowToUseSectionImg = styled.img`
  width: 635px;
  height: 652px;

  object-fit: cover;
  object-position: center;
`

const HowToUseSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-right: 16px;
  max-width: 580px;
  width: 100%;
`

const HowToUseSectionTitle = styled.div`
  font-family: 'Optima', sans-serif;
  font-size: 36px;
  padding: 12px 12px 28px 0;
`

const HowToUseSectionContent = styled.div`
  line-height: 1.4rem;
`

const HowToUseSectionItem = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 18px;
  margin: 0 0 26px;
`

const KeyIngredientsSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding-top: 40px;
  width: 100%;
`

const KeyIngredientsSectionImg = styled.img`
  object-fit: cover;
  object-position: center;

  width: 426px;
  height: 640px;
`

const KeyIngredientsSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const KeyIngredientsSectionTitle = styled.div`
  font-family: 'Optima', sans-serif;
  font-size: 38px;
  margin-bottom: 36px;
`

const KeyIngredientsSectionContent = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  max-width: 628px;
  width: 100%;
`

const KeyIngredientsSectionItem = styled.li`
  font-family: 'Montserrat', sans-serif;
  font-size: 18px;
  margin: 0 0 12px;
  line-height: 1.6rem;
`

const ListOfIngredientsButton = styled.div`
  cursor: pointer;
  padding: 6px 0 6px 0;

  border-bottom: 2px solid ${props => props.theme.colors.black};
  color: ${props => props.theme.colors.black};
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;

  &:hover {
    border-bottom: 2px solid ${props => props.theme.colors.brownLight};
    color: ${props => props.theme.colors.brownLight};
  }
`

const ClinicalResultsSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding-top: 40px;
  width: 100%;
`

const ClinicalResultsImg = styled.img`
  object-fit: cover;
  object-position: center;

  width: 600px;
  height: 650px;
`

const ClinicalResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const ClinicalResultsTitle = styled.div`
  font-family: 'Optima', sans-serif;
  font-size: 38px;
  margin-bottom: 36px;
`

const ClinicalResultsContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  max-width: 428px;
  width: 100%;
`

const ClinicalResultsItem = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 18px;
  margin: 0 0 10px;
  line-height: 1.5;
  letter-spacing: -0.3px;
`

const ReviewsContainer = styled.div`
  width: 100%;
  margin-top: 60px;
`

const StickyFooter = styled.div<{ isVisible: boolean }>`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 20px 0 20px 0;
  width: 100%;
  z-index: ${props => props.theme.zIndex.others};
  background-color: ${props => props.theme.colors.white};

  transform: translateY(100%);
  visibility: hidden;
  opacity: 0;

  ${props =>
    props.isVisible &&
    css`
      transform: translateY(0);
      opacity: 1;
      visibility: visible;
      transition: transform 0.25s ease-in-out, opacity 0.25s ease-in-out, 0.25s ease-in-out;
    `}
`

const StickyFooterProductInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const StickyFooterProductBrand = styled.div`
  margin-bottom: 12px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 800;
  text-transform: uppercase;
  font-size: 16px;
  color: ${props => props.theme.colors.greyDark};
`

const StickyFooterProductName = styled.div`
  font-family: 'Optima', sans-serif;

  font-size: 26px;
`

const StickyFooterButtonContainer = styled.div``

const StyledStickyFooterButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 12px 26px;
  min-width: 316px;
  width: 100%;

  font-weight: bolder;
`

const StickyFooterPrice = styled.div`
  font-weight: bolder;
`

export default ProductPage
