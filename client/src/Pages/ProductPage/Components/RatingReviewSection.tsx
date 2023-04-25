import { useState } from 'react'
import styled from 'styled-components'

import { ProductInfoType } from '../../../helpers/types'
import { Rating } from '../../../components/Rating/Rating'
import { Button } from '../../../components/Button/Button'
import { CustomInput, InputSize } from '../../../components/CustomInput/CustomInput'

export interface RatingReviewSectionProps {
  productInfo: ProductInfoType | undefined
}

export const RatingReviewSection: React.FC<RatingReviewSectionProps> = ({ productInfo }) => {
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [showAskQuestionForm, setShowAskQuestionForm] = useState(false)

  const handleShowReviewForm = () => {
    setShowReviewForm(true)
    setShowAskQuestionForm(false)
  }

  const handleShowAskQuestionForm = () => {
    setShowAskQuestionForm(true)
    setShowReviewForm(false)
  }

  return (
    <Container>
      <Title> Reviews </Title>
      <TopSection>
        <LeftContainer>
          <Rating existingRating={productInfo?.rating} />
          <QandA>0 Questions \ 0 Answers </QandA>
        </LeftContainer>
        {/*to do spinner */}
        <RightContainer>
          <Button onClick={handleShowReviewForm}> WRITE A REVIEW </Button>
          <Button onClick={handleShowAskQuestionForm}> ASK A QUESTION </Button>
        </RightContainer>
      </TopSection>

      <ReviewsSections>
        {showReviewForm && (
          <WriteReviewFormContainer>
            <FormTitle>WRITE A REVIEW</FormTitle>
            <ScoreContainer>
              <ScoreLabel> Score </ScoreLabel>
              <Rating />
            </ScoreContainer>

            <ReviewFormContainer>
              <CustomInput label="Title:" sizeVariant={InputSize.LARGE} />
              <CustomInput label="Review:" sizeVariant={InputSize.LARGE} />
            </ReviewFormContainer>

            <UserDetailsForm>
              <StyledCustomInput label="Use your name:" sizeVariant={InputSize.SMALL} />
              <StyledCustomInput label="Email:" sizeVariant={InputSize.SMALL} />
            </UserDetailsForm>

            <ButtonContainer>
              <Button> POST </Button>
            </ButtonContainer>
          </WriteReviewFormContainer>
        )}
        {showAskQuestionForm && (
          <AskQuestionFormContainer>
            <ReviewFormContainer>
              <FormTitle>ASK A QUESTION</FormTitle>
              <CustomInput label="Question:" sizeVariant={InputSize.LARGE} />
            </ReviewFormContainer>

            <UserDetailsForm>
              <StyledCustomInput label="Use your name:" sizeVariant={InputSize.SMALL} />
              <StyledCustomInput label="Email:" sizeVariant={InputSize.SMALL} />
            </UserDetailsForm>

            <ButtonContainer>
              <Button> POST </Button>
            </ButtonContainer>
          </AskQuestionFormContainer>
        )}
      </ReviewsSections>

      {productInfo?.rating === 0 && (
        <BottomSection>
          <Rating existingRating={productInfo?.rating} />
          <Button> BE THE FIRST TO WRITE A REVIEW </Button>
        </BottomSection>
      )}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 0 20px;
  max-width: 1150px;
  width: 100%;
`

const Title = styled.div`
  font-family: 'Optima', sans-serif;
  font-size: 38px;
  color: ${props => props.theme.colors.black};
`

const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 20px 0;

  border-bottom: 1px solid ${props => props.theme.colors.brownLight};
`

const LeftContainer = styled.div`
  display: flex;
`

const QandA = styled.div`
  margin-left: 12px;
  font-family: 'Montserrat', sans-serif;
  text-decoration: underline;
  font-size: 14px;
`

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const ReviewsSections = styled.div`
  padding: 20px 0;
`

const WriteReviewFormContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const FormTitle = styled.div`
  padding: 16px 0;
  font-family: 'Optima', sans-serif;
  font-size: 16px;
  color: ${props => props.theme.colors.black};
`

const ScoreContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 22px 0;
`

const ScoreLabel = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;

  color: ${props => props.theme.colors.greyDark};
`

const ReviewFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 16px;
`

const UserDetailsForm = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 20px;
  padding-right: 6px;
`

const StyledCustomInput = styled(CustomInput)`
  width: 400px;
`

const AskQuestionFormContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`

const BottomSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  padding: 20px;
`
