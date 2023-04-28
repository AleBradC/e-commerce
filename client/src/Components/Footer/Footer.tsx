import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import {
  browsRoute,
  cleansersRoute,
  faceOilsRoute,
  faceSerumsRoute,
  lipGlossesRoute,
  lipSticksRoute,
  mascaraRoute,
  moisturizersRoute,
} from '../../helpers/routes'
import { Button } from '../Button/Button'
import { CustomInput, InputSize } from '../CustomInput/CustomInput'

export interface FooterFormFields {
  footerEmail: string
}

export const Footer = () => {
  const navigateTo = useNavigate()

  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty, isValid },
  } = useForm<FooterFormFields>({
    mode: 'onChange',
    defaultValues: {
      footerEmail: '',
    },
  })

  const handleSubscribe = (data: FooterFormFields) => {
    console.log(data, 'footer')
    reset()
  }

  return (
    <Container>
      <RightContainer noValidate autoComplete="off" onSubmit={handleSubmit(handleSubscribe)}>
        <InputContainer>
          <Title> Sign up for 10% off your first order and discover the best new beauty first. </Title>
          <StyledCustomInput
            placeholder="Email"
            type="email"
            id="footerEmail"
            sizeVariant={InputSize.SMALL}
            {...register('footerEmail')}
          />
        </InputContainer>
        <Button type="submit" disabled={!isDirty || !isValid}>
          Subscribe
        </Button>
      </RightContainer>

      <LeftContainer>
        <ShopContainer>
          <ContentTitle> SHOP </ContentTitle>
          <ContentItem onClick={() => navigateTo(cleansersRoute)}> Cleansers </ContentItem>
          <ContentItem onClick={() => navigateTo(moisturizersRoute)}> Moisturizers </ContentItem>
          <ContentItem onClick={() => navigateTo(faceSerumsRoute)}> Face Serums </ContentItem>
          <ContentItem onClick={() => navigateTo(faceOilsRoute)}> Face Oils </ContentItem>
          <ContentItem onClick={() => navigateTo(mascaraRoute)}> Mascara </ContentItem>
          <ContentItem onClick={() => navigateTo(browsRoute)}> Brows </ContentItem>
          <ContentItem onClick={() => navigateTo(lipSticksRoute)}> Lipstick </ContentItem>
          <ContentItem onClick={() => navigateTo(lipGlossesRoute)}> Lip Gloss </ContentItem>
        </ShopContainer>

        <AboutUsContainer>
          <ContentTitle> ABOUT US </ContentTitle>
          <ContentItem> About SheN </ContentItem>
          <ContentItem> Service </ContentItem>
          <ContentItem> Orders </ContentItem>
        </AboutUsContainer>
      </LeftContainer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 68px 0;
  margin-top: 32px;
  margin-bottom: 0;
  width: 100%;
`

const RightContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-basis: 50%;

  max-width: 428px;
  width: 100%;
`

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const Title = styled.span`
  font-size: 24px;
  margin-bottom: 12px;

  font-family: 'Montserrat', sans-serif;
`

const StyledCustomInput = styled(CustomInput)`
  width: 380px;
`

const LeftContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-evenly;
  flex-basis: 50%;
`

const ShopContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`

const AboutUsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`

const ContentTitle = styled.span`
  font-size: 18px;
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;

  margin-bottom: 8px;
`

const ContentItem = styled.span`
  font-size: 18px;
  font-family: 'Montserrat', sans-serif;
  cursor: pointer;

  :hover {
    color: ${props => props.theme.colors.brownLight};
  }
`
